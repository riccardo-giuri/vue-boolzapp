const app = Vue.createApp({
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: "Michele",
          avatar: "_1",
          messageNumber: 3,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di dargli da mangiare",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },

        {
          id: 2,
          name: "Fabio",
          avatar: "_2",
          messageNumber: 3,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "received",
            },
          ],
        },

        {
          id: 3,
          name: "Samuele",
          avatar: "_3",
          messageNumber: 3,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },

        {
          id: 4,
          name: "Luisa",
          avatar: "_4",
          messageNumber: 2,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
      ],

      currentActiveprofile: null,
      newMessage: ""
    }
  },

  methods: {
    openChat(chatToOpen) {
      this.currentActiveprofile = chatToOpen;
    },

    Test() {
      console.log("SOS");
    },

    onEnterMessage() {
      this.sendMessage();
      setTimeout(this.autoReply, 1000);
    },

    sendMessage() {
      if(this.newMessage !== "") {
        const newFormattedDate = this.createFormattedTime();

        const messageToAdd = {
          date: newFormattedDate,
          message: this.newMessage,
          status: "sent"
        }

        this.currentActiveprofile.messages.push(messageToAdd);
        this.currentActiveprofile.messageNumber++;
      }
    },

    createFormattedTime() {
      const now = new Date();

      const rawformattedIT = Intl.DateTimeFormat('it', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(now);

      const formattedIT = rawformattedIT.replace(',', '');

      return formattedIT;
    },

    autoReply() {
      const newFormattedDate = this.createFormattedTime();

      const messageToAdd = {
        date: newFormattedDate,
        message: "ok, ho capito!",
        status: "received"
      }

      this.currentActiveprofile.messages.push(messageToAdd);
      this.currentActiveprofile.messageNumber++;
    }
  },

  beforeMount() {
    this.createFormattedTime();
    this.currentActiveprofile = this.contacts[0];
  }
}).mount("#app");