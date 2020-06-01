<template>
    <div>
        <h1>Retrieve Secret</h1>

        <form>
            <label for="secret-hash">Secret Hash</label><br>
            <input type="text" id="secret-hash" name="secret-hash" v-model="secretHash"><br>

            <button @click="viewSecret($event)">Retrieve</button>
        </form>

        <modal name="retrieved-secret-modal" adaptive>
            <h2>Retrieved Secret</h2>

            <form>

            <label for="retrieved-secret-modal-hash">Click to this field to copy the secret hash so you can share it</label><br>
            <input type="text" id="retrieved-secret-modal-hash" name="retrieved-secret-modal-hash" disabled :value="retrievedSecretModal.hash">
            <button type="button" @click="doCopy()">Copy to Clipboard</button><br>

            <label for="retrieved-secret-modal-secret-text">Secret Text</label><br>
            <input type="text" id="retrieved-secret-modal-secret-text" name="retrieved-secret-modal-secret-text" disabled :value="retrievedSecretModal.secretText"><br>

            <label for="saved-secret-created-at">Created At</label><br>
            <input type="datetime-local" id="saved-secret-created-at" name="saved-secret-created-at" disabled :value="retrievedSecretModal.createdAt"><br>

            <label for="saved-secret-expires-at">Expires At</label><br>
            <input type="datetime-local" id="saved-secret-expires-at" name="saved-secret-expires-at" disabled :value="retrievedSecretModal.expiresAt"><br>

            <label for="saved-secret-remaining-views">Remaining Views</label><br>
            <input type="number" id="saved-secret-remaining-views" name="saved-secret-remaining-views" disabled :value="retrievedSecretModal.remainingViews"><br>

            <button @click="closeRetrievedSecretModal($event)">Ok</button>

            </form>
        </modal>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      secretHash: '',
      retrievedSecretModal: {}
    }
  },

  methods: {
    closeRetrievedSecretModal (event) {
      if (event) {
        event.preventDefault()
      }

      this.$modal.hide('retrieved-secret-modal')
    },

    doCopy () {
      this.$copyText(this.retrievedSecretModal.hash).then(e => {
        alert('Secret hash has been copied to your clipboard')
      }, (e) => {
        alert('There was an error during copying secret hash')
      })
    },

    async viewSecret (event) {
      if (event) {
        event.preventDefault()
      }

      if (!this.secretHash.length) {
        alert('Secret Hash cannot be empty')
        return
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/secret/${this.secretHash}`)
        this.retrievedSecretModal = response.data
        this.$modal.show('retrieved-secret-modal')
      } catch (error) {
        console.error(error.response)
        alert(error.response.data)
      }
    }
  }
}
</script>

<style>
.vm--modal {
  margin-top: -100px !important;
  height: auto !important;
  padding-bottom: 20px;
}
</style>
