<template>
  <div class="col-12-300 --p-h-6">
    <h3>Product Summary:</h3>
    <p>{{ product.name }}</p>

    <div class="--font-size-16 col-12-300 --align-items-baseline --gap-1">
      <h5 class="--font-size-16 --flex-basis-15">Total:</h5>
      <span class="--m-b-4">${{ product.price }}</span>
    </div>
    <div v-for="(value, key) in product.details"
         :key="key"
         class="--font-size-16 col-12-300 --align-items-baseline --gap-1 --m-b-4">
      <h5 class="--font-size-16 --flex-basis-15">{{ key }}:</h5>
      <span>{{ value }}</span>
    </div>
  </div>

  <div id="paypal-buttons"
       class="--m-t-10"/>

  <div v-if="processorInfo.enableSandbox"
       class="col-12-300">
    <h1 class="--color-warn-6">SANDBOX ENABLED</h1>
  </div>
</template>

<script lang="ts"
        setup>
import { onBeforeMount, defineProps, ref, computed } from "vue";
import { loadScript } from "@paypal/paypal-js";
import { getPaymentProcessor_Service } from "@/services/payments/PaymentProcessDataService.ts";
import { getProduct_Service } from "@/services/payments/ProductDataService.ts";
import { createPayment_Service } from "@/services/payments/PaymentDataService.ts";

// TS specific prop definition
const emit = defineEmits(['paidFor'])

const props = defineProps(
  ['attendee', 'event', 'fName', 'lName', 'email']/*{
  attendee: {type: Object, default: () => {}},
  event: {type: Object, default: () => {}}
}*/)

const syncedFName = computed(() => props.fName);
const syncedLName = computed(() => props.lName);
const syncedEmail = computed(() => props.email);

/*-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===
-| PayPal
-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===/*/
let paypal: any;

const processorInfo = ref({
  id: null,
  sandbox: "",
  live: "",
  enableSandbox: null
})

const product = ref({
  id: null,
  price: 0,
  name: "",
  shortName: "",
  details: ""
})

const payInfo = ref({
  nameFirst: syncedFName, // props.attendee.name_First,
  nameLast: syncedLName, // props.attendee.name_Last,
  attendeeId: null, // props.attendee.id,
  payerEmail: syncedEmail, // props.attendee.contact_Email,
  eventId: props.event.eventId,
  eventClient: props.event.expo_Client,
  eventYear: props.event.expo_Year,
  productId: product.value.id,
  processorId: processorInfo.value.id,
  paymentSuccess: true,
  isSandbox: processorInfo.value.enableSandbox,
})

async function getProduct(eId: number) {
  const p = await getProduct_Service(eId)
  product.value.id = p.id
  product.value.price = p.price
  product.value.name = p.name
  product.value.shortName = p.shortName
  product.value.details = p.details
  // Payment Info
  payInfo.value.productId = product.value.id
}

async function getPaymentProcessor(eId: number) {
  const s = await getPaymentProcessor_Service(eId)
  processorInfo.value.id = s.id
  processorInfo.value.enableSandbox = s.enableSandbox
  processorInfo.value.sandbox = s.processorClientIds.sandbox
  processorInfo.value.live = s.processorClientIds.live
  // Payment Info
  payInfo.value.processorId = processorInfo.value.id
  payInfo.value.isSandbox = processorInfo.value.enableSandbox
}

onBeforeMount(async () => {
  try {
    await getPaymentProcessor(props.event.eventId)
    await getProduct(props.event.eventId)

    const cId = processorInfo.value.enableSandbox ? processorInfo.value.sandbox : processorInfo.value.live
    paypal = await loadScript({
      clientId: cId,
      currency: "USD",
      components: ["buttons"]
    });
  } catch (error) {
    console.error("failed to load the PayPal JS SDK script", error);
  }

  if (paypal) {
    try {
      await paypal.Buttons({
          async createOrder(data: any, actions: any) {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: product.value.name,
                  soft_descriptor: product.value.shortName,
                  amount: {currency: "USD", value: product.value.price},
                  shipping: {
                    address: {
                      address_line_1: props.attendee.address_Line1,
                      address_line_2: props.attendee.address_Line2,
                      admin_area_1: "", // state code here
                      admin_area_2: props.attendee.address_City,
                      country_code: props.attendee.address_Country,
                      postal_code: props.attendee.address_Zip,
                    },
                    name: {fullName: props.attendee.name_First + props.attendee.name_Last},
                    email_address: props.attendee.contact_Email
                  }

                },
              ],
              // deprecated...but works while 'payment_source' doesn't
              payer: {
                name: {given_name: props.attendee.name_First, surname: props.attendee.name_Last},
                email_address: props.attendee.contact_Email,
                phone: {
                  phone_number: {
                    national_number: props.attendee.contact_Phone
                  }
                },
              },
              /*payment_source: {
                paypal: {
                  experience_context: {
                    shipping_preference: "NO_SHIPPING"
                  },
                  email_address: "email@email.com",// props.attendee.contact_Email,
                  name: {given_name: props.attendee.name_First, surname: props.attendee.name_Last},
                  phone_number: {national_number: props.attendee.contact_Phone},
                  address: {
                    address_line_1: props.attendee.address_Line1,
                    address_line_2: props.attendee.address_Line2,
                    admin_area_1: "", // state code here
                    admin_area_2: props.attendee.address_City,
                    country_code: props.attendee.address_Country,
                    postal_code: props.attendee.address_Zip,
                  },
                  attributes: {
                    customer: {
                      email_address: props.attendee.contact_Email,
                      phone_number: {
                        national_number: props.attendee.contact_Phone
                      },
                      name: {
                        given_name: props.attendee.name_First,
                        surname: props.attendee.name_Last
                      },
                    }
                  }
                }
              }*/
            })
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture()
            emit('paidFor')
            console.log(order)
            await createPayment_Service(payInfo.value, order)
          },
          onError: (err: any) => {
            console.log("A shocking error with PayPal...", err)
          }
        }
      ).render("#paypal-buttons");
    } catch (error) {
      console.error("failed to render the PayPal Buttons", error);
    }
  }
})
</script>
