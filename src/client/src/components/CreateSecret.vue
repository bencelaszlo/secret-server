<template>
<div>
  <form>
    <input type="text" id="secret-text" name="secret-text" v-model="secretText" required><br>
    <label for="expires-after-views">Expires After Views</label><br>

    <input type="number" id="expire-after-views" name="expire-after-views" v-model="expireAfterViews" min="1" max="10" required><br>
    <label for="expires-at">Time To Live (minutes)</label><br>

    <input type="number" id="expires-at" name="expires-at" v-model="expiresAt" min="5" max="2880" required><br>
    <button @click="store($event)">Store Secret</button>
  </form>

  <modal name="saved-secret-modal" adaptive>
    <h1>Saved Secret</h1>

    <form>

      <label for="saved-secret-modal-hash">Click to this field to copy the secret hash so you can share it</label><br>
      <input type="text" id="saved-secret-modal-hash" name="saved-secret-modal-hash" disabled :value="savedSecretModal.hash">
      <button type="button" @click="doCopy()">Copy to Clipboard</button><br>

      <label for="saved-secret-modal-secret-text">Secret Text</label><br>
      <input type="text" id="saved-secret-modal-secret-text" name="saved-secret-modal-secret-text" disabled :value="savedSecretModal.secretText"><br>

      <label for="saved-secret-created-at">Created At</label><br>
      <input type="datetime-local" id="saved-secret-created-at" name="saved-secret-created-at" disabled :value="savedSecretModal.createdAt"><br>

      <label for="saved-secret-expires-at">Expires At</label><br>
      <input type="datetime-local" id="saved-secret-expires-at" name="saved-secret-expires-at" disabled :value="savedSecretModal.expiresAt"><br>

      <label for="saved-secret-remaining-views">Remaining Views</label><br>
      <input type="number" id="saved-secret-remaining-views" name="saved-secret-remaining-views" disabled :value="savedSecretModal.remainingViews"><br>

      <button @click="$modal.hide('saved-secret-modal')">Ok</button>

    </form>
  </modal>
</div>
</template>

<script>
import axios from 'axios'

const MIN_EXPIRE_AFTER_VIEWS = 1
const MIN_EXPIRES_AT = 5

export default {
  data () {
    return {
      secretText: '',
      expiresAt: MIN_EXPIRES_AT,
      expireAfterViews: MIN_EXPIRE_AFTER_VIEWS,
      savedSecretModal: {}
    }
  },

  methods: {
    doCopy: function () {
      this.$copyText(this.savedSecretModal.hash).then(function (e) {
        alert('Secret hash has been copied to your clipboard')
        console.log(e)
      }, function (e) {
        alert('There was an error during copying secret hash')
      })
    },

    async store (event) {
      if (event) {
        event.preventDefault()
      }

      const errorMessages = this.validate()
      if (errorMessages.length) {
        alert(errorMessages.join('\n'))
        return
      }

      const data = {
        secret: this.secretText,
        expireAfterViews: this.expireAfterViews,
        expireAfter: new Date(new Date().getTime() + this.expiresAt * 60000) // Add TTL to current time
      }

      try {
        const response = await axios.post('http://localhost:3000/api/secret/', data)
        this.savedSecretModal = response.data
        this.$modal.show('saved-secret-modal')
      } catch (error) {
        console.error(error)
        alert('There was an error during saving secret')
      }
    },

    validate () {
      const errorMessages = []
      if (!this.secretText.length) {
        errorMessages.push('Secret Text is a required field')
      }

      if (this.expiresAt < MIN_EXPIRES_AT) {
        errorMessages.push('The secret must live at least 5 minutes')
      }

      if (this.expireAfterViews < MIN_EXPIRE_AFTER_VIEWS) {
        errorMessages.push('The secret must have been seen at least once')
      }

      return errorMessages
    },

    viewSecret () {
      /* const response = await fetch('http://localhost:3000/secret/JDJiJDEwJHZSL0QyMmFpTnFicXRYbi43b3hjSWV1RnhDNlgvdGZYbFN5bnVBb1FEYXNIdUVRR0tYQ25H', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      const data = response.json()
      console.log(data) */
    }
  }
}
</script>

<style>
.vm--modal {
  height: 50% !important;
}
</style>
