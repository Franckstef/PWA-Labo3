// Demande la permission d'afficher des notifications en cliquant sur le boutton
function meNotifier() {
    Notification.requestPermission().then(function (result) {
        console.log("permission accordée");
    });
}

// Déclenche l’enregistrement d’un background sync
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(function(reg) {
        return reg.sync.register('mon-tag');
    });
};

// Envoie la notification avec un click, avec un titre et un message dans le body
// Pas utile dans cet exercice
/*function envoyerNotificationThreadUtilisateur() {
  if (Notification.permission === 'granted') {
      var options = {
          body: 'Votre page est maintenant disponible !',
          requireInteraction: true
      };

      const notification = new Notification('Connection réétablie', options);
  } else {
      console.log("aucune notification car non permis");
  }
}*/