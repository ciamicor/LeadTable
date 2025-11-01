<template>
  <div class="row-12-300 --gap-24 --place-content-center --p-4  --p-v-24-clamp">
    <form
      class="col-12-300 col-8-600 col-6-900"
    >
      <h4 class="--m-0">
        {{ expoLocal.expo_Client }}
        {{ expoLocal.expo_Year }}
        Suppliers' Day
      </h4>
      <h1 id="attendee-reg">Company Registration</h1>

      <div class="--m-t-8 form-container col-12-300">
        <h2>Administrator Contact Information</h2>
        <p>If we need to get in touch with your company about something related to event information
           or reservations, who should we contact?</p>
        <p>This information is internal only, and will not be publicly viewable.</p>
        <label>
          Full Name
          <input
            v-model="exhibitor.contactName"
            name="full-name"
            placeholder="Full Name"
            required
            type="text">
        </label>
        <div class="row-12-300 --no-space">
          <label>
            Email Address
            <input
              v-model="exhibitor.privateEmail"
              autocomplete="email"
              name="title"
              placeholder="Email Address"
              required
              type="email"/>
          </label>
          <label>
            Phone Number
            <input
              v-model="exhibitor.contactPhone"
              autocomplete="tel"
              name="phone"
              placeholder="Phone Number"
              required
              type="tel"/>
          </label>
        </div>
      </div>
      <div class="--m-t-4 form-container col-12-300">
        <h2>Company Details</h2>
        <p>Fill out your profile to help expo attendees get to know you better!</p>
        <p>This contact information will be displayed publicly on the booth map.</p>
        <label>
          <span>Name {{ exhibitor.externalId }}</span>
          <span>Name {{ externalIdFormat }}</span>
          <input
            v-model="urlParams.companyName"
            disabled
            name="company-name"
            placeholder="Company Name"
            required
            type="text"
          />
        </label>
        <div class="row-12-300 --no-space">
          <label>
            Email Address
            <input
              v-model="exhibitor.publicEmail"
              autocomplete="email"
              name="title"
              placeholder="Email Address"
              required
              type="email"/>
          </label>
          <label>
            Phone Number
            <input
              v-model="exhibitor.phone1"
              autocomplete="tel"
              name="phone"
              placeholder="Phone Number"
              required
              type="tel"/>
          </label>
        </div>
        <div class="col-12-300 --no-space">
          <label>
            Website
            <input
              id="company-website"
              v-model="exhibitor.website"
              name="company-website"
              placeholder="https://www.yourcompany.com"
              type="text">
          </label>
          <label>
            Description
            <textarea
              id="company-description"
              v-model="exhibitor.description"
              cols="30"
              name="company-description"
              rows="4"></textarea>
            <span class="--font-size-14">
             1000 characters max
          </span>
          </label>
          <label class="row-12-300">
            <span class="--flex-basis-100">Address</span>
            <input
              v-model="exhibitor.address"
              autocomplete="address-line1"
              class="--w-45"
              name="address"
              placeholder="Address"
              type="text"/>
            <input
              v-model="exhibitor.address2"
              autocomplete="address-line2"
              class="--w-45"
              name="address"
              placeholder="Apt, Suite, etc"
              type="text"/>
            <input
              v-model="exhibitor.city"
              autocomplete="address-level2"
              name="city"
              placeholder="City"
              type="text"/>
            <input
              v-model="exhibitor.state"
              autocomplete="address-level1"
              name="state"
              placeholder="State/Province"
              type="text"/>
            <input
              v-model="exhibitor.zip"
              autocomplete="postal-code"
              name="zip"
              placeholder="Zip/Postal Code"
              type="text"/>
            <select id="selectCountry"
                    v-model="exhibitor.country"
                    autocomplete="country-name"
                    name="selectCountry">
              <option disabled
                      selected
                      value="">Select Country
              </option>
              <option v-for="c in countries"
                      :key="c"
                      :value="c"
              >
                {{ c }}
              </option>
            </select>
          </label>
        </div>
      </div>
    </form>
    <div class="col-12-300 col-3-700 --gap-8 --position-sticky --top-8 --align-self-start">
      <a
        :href="expoLocal.expoFp_MapUrl + '?' + urlParams.booth"
        class=""
        target="_blank"
      >
        <i class="bi-arrow-return-left --m-r-4"></i>
        Return to Map
      </a>
      <!-- TODO: Include ability to add extras & sponsorships to profile here -->
      <div
        v-if="urlParams.booth"
        class="row-12-300 --no-space">
        <span class="label --success--invert">
          You're reserving booth #{{ urlParams.booth }}
        </span>
        <span class="label --primary--invert">
          ${{ urlParams.price }}
        </span>
      </div>
      <button class="--success"
              @click="createExhibitor">
        {{ status }}
      </button>
      <p>{{ urlParams }}</p>
      <p>{{ expoLocal }}</p>
      <p>{{ exhibitor }}</p>
    </div>
  </div>
</template>

<script lang="js"
        setup>
// TODO Convert to TS
import { ref, computed } from 'vue'
import { useCompanyLocalStore, useExpoLocalStore } from '@/stores.js'
import { getUrlHost, getURLParams } from "@/services/functions/UrlService.ts";
import { countries } from "@/services/addresses/AddressForm_Countries.js";
import { formatSlug } from "@/services/functions/TextManipulationService.ts";
import {
  addExhibitor,
  addExhibitorBooth,
  getExhibitorDetails,
  getExhibitorId
} from "@/services/ExpoFPDataService.js";

const host = getUrlHost()
const companyLocal = useCompanyLocalStore()
const expoLocal = useExpoLocalStore()

// TODO add global status, add to global loading component where needed.
const status = ref( 'Continue' )

const urlParams = ref(
  getURLParams()
)

const exhibitor = ref( {
  expo_Year: expoLocal.expo_Year,
  expo_Client: expoLocal.expo_Client,
  name: '',
  description: '',
  country: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phone1: '',
  publicEmail: '',
  privateEmail: '',
  website: '',
  contactName: '',
  contactPhone: '',
  externalId: '', // company name in URL slug format, must be unique
} )

const externalIdFormat = computed( () => {
  return exhibitor.value.externalId = formatSlug( urlParams.value.companyName )
} )

async function createExhibitor() {
  exhibitor.value.expo_Year = expoLocal.expo_Year
  exhibitor.value.expo_Client = expoLocal.expo_Client

  status.value = 'Checking info...'
  status.value = await addExhibitor( expoLocal.expo_Client, expoLocal.expo_Year, exhibitor.value )
  const exhibId = await getExhibitorId(
    externalIdFormat.value,
    expoLocal.expo_Client,
    expoLocal.expo_Year )
  const exhibDeets = await getExhibitorDetails(
    exhibId,
    expoLocal.expo_Client,
    expoLocal.expo_Year )
  status.value = 'Adding booth...'
  await addExhibitorBooth( expoLocal.expo_Client,
    expoLocal.expo_Year,
    exhibId,
    urlParams.value.booth )
  status.value = 'Heading to profile!'
  window.location.href = "https://app.expofp.com" + exhibDeets.autoLoginUrl
}

</script>
