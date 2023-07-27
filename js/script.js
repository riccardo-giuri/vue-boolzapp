const app = Vue.createApp({
  data() {
    return {
      /**
       * The array that contains the contact objects
       * @type {object[]}
       */
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

      /**
       * the list of filtered contacts from the search input
       * @type {object[]}
       */
      filteredList: [],

      /**
       * the curret profile selected in the chat
       * @type {object}
       */
      currentActiveprofile: null,

      /**
       * the new message input from the chat form
       * @type {string} 
       */
      newMessage: "",

      /**
       * the string that you need to use to filter the profiles
       * @type {string} 
       */
      filterValue: ""
    }
  },

  methods: {
    /**
     * Open the chat when is clicked
     * @param {object} chatToOpen The profile object that need to be the next active item
     */
    openChat(chatToOpen) {
      this.currentActiveprofile = chatToOpen;
    },

    /**
     * The function called when the key enter is used on the chat form
     */
    onEnterMessage() {
      this.sendMessage();
      setTimeout(this.autoReply, 1000);
    },

    /**
     * Send the new message to the chat log
     */
    sendMessage() {
      //check if the new message exist
      if(this.newMessage !== "") {
        //create a new date to insert in the new message object that need to be added
        const newFormattedDate = this.createFormattedTime();

        //create the new sent message object with his new values
        const messageToAdd = {
          date: newFormattedDate,
          message: this.newMessage,
          status: "sent"
        }

        //add the object created to the messages array
        this.currentActiveprofile.messages.push(messageToAdd);
        //increment the number of total messages in that chat
        this.currentActiveprofile.messageNumber++;
      }
    },

    /**
     * Format the current date correctly and returns its value
     * @returns {string} 
     */
    createFormattedTime() {
      //create a new current date
      const now = new Date();

      //format the date in the way you want
      const rawformattedIT = Intl.DateTimeFormat('it', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(now);

      //eliminate the unwanted characters in the string
      const formattedIT = rawformattedIT.replace(',', '');

      //return the formatted date string value
      return formattedIT;
    },

    /**
     * send the reply automatic message
     */
    autoReply() {
      //create new current date
      const newFormattedDate = this.createFormattedTime();

      //create the new recived message object with his new values
      const messageToAdd = {
        date: newFormattedDate,
        message: "ok, ho capito!",
        status: "received"
      }

      //add the object created to the messages array
      this.currentActiveprofile.messages.push(messageToAdd);
      //increment the number of total messages in that chat
      this.currentActiveprofile.messageNumber++;
    },

    /**
     * Filter the contacts by the string value of the form
     */
    filterContacts() {
      //add a new filtered array by a string, to the filtered array variable
      this.filteredList = this.contacts.filter(value => value.name.includes(this.filterValue));
    }
  },

  beforeMount() {
    this.createFormattedTime();
    this.filteredList = this.contacts;
    this.currentActiveprofile = this.filteredList[0];
  }
}).mount("#app");