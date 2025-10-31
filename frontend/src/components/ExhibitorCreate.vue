<template>
  <div class="row-12-300 --gap-24 --place-content-center --p-4">
    <form
      class="col-12-300 col-10-600 col-8-900 --p-b-0 --p-t-12"
      @submit.prevent="addExhibitor(expoLocal.expo_Client, expoLocal.expo_Year, exhibitor)"
    >
      <h4 class="--m-0">
        {{ expoLocal.expo_Client }}
        {{ expoLocal.expo_Year }}
        Suppliers' Day
      </h4>
      <h1 id="attendee-reg">Company Registration</h1>
      <h2 class="--m-t-6">Administrator Contact Information</h2>
      <p>If we need to get in touch with your company about something related to event information
         or reservations, who should we contact?</p>
      <p>This information is internal only, and will not be publicly viewable.</p>
      <div class="row-12-300 --no-space">
        <label>
          Full Name
          <input
            v-model="exhibitor.contactName"
            name="full-name"
            placeholder="Full Name"
            required
            type="text">
        </label>
      </div>
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
      <h2 class="--m-t-12">Company Details</h2>
      <p>Fill out your profile to help expo attendees get to know you better!</p>
      <p>This contact information will be displayed publicly on the booth map.</p>
      <label>
        <span>Name {{ exhibitor.externalId }}</span>
        <span>Name {{ externalIdFormat }}</span>
        <input
          v-model="exhibitor.name"
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
      <button
        class="--success --m-t-12"
        type="submit"
      >
        Submit Registration
      </button>
    </form>
    <button @click="test">TEST</button>
  </div>
</template>

<script lang="js"
        setup>
// TODO Convert to TS
import { ref, computed } from 'vue'
import { useCompanyLocalStore, useExpoLocalStore } from '@/stores.js'
import { getUrlHost } from "@/services/functions/UrlService.ts";
import { countries } from "@/services/addresses/AddressForm_Countries.js";
import { formatSlug } from "@/services/functions/TextManipulationService.ts";
import { addExhibitor, getExhibitorId } from "@/services/ExpoFPDataService.js";

const host = getUrlHost()
const companyLocal = useCompanyLocalStore()
const expoLocal = useExpoLocalStore()

const exhibitor = ref( {
  expo_Year: expoLocal.expo_Year,
  expo_Client: expoLocal.expo_Client,
  name: 'Company & Sons.com',
  description: 'This is my about me\nhelllloooo everyone!',
  country: 'United States',
  address: '1112 Company Street',
  address2: '#2455',
  city: 'City Place',
  state: 'State Area',
  zip: '56086',
  phone1: '5554443333',
  publicEmail: 'public@test.com',
  privateEmail: 'private@test.com',
  website: 'company.com',
  contactName: 'Test Private Name',
  contactPhone: '0000000000',
  externalId: '', // company name in URL slug format, must be unique
} )

const externalIdFormat = computed( () => {
  return exhibitor.value.externalId = formatSlug( exhibitor.value.name )
} )

async function test() {
  await getExhibitorId( externalIdFormat.value, expoLocal.expo_Client, expoLocal.expo_Year )
}
</script>
