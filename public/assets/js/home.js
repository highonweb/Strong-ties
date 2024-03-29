const publicVapidKey = 'BIJFjOvC8wohJdhk8jDR1bdxrzScskN7ulc5liCldQoCFibQ5Z7lijGikDfdw5eEXfYTUdcuuCczfMQrrvpS77Q'
if (window.Notification) {
    Notification.requestPermission(() => {
      if (Notification.permission === 'granted') {
        getSubscriptionObject()
          .then(subscribe)
      }
    });
  }
  function getSubscriptionObject() {
    return navigator.serviceWorker.register('./sw.js')
      .then(async (worker) => {
        PushManager.getSubscription().then(function(pushSubscription) {
          if (pushSubscription==null) {
            console.log('Not yet subscribed to Push')
            return worker.pushManager.subscribe({
              applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
              userVisibleOnly:true
            });
          }
        } );
          
          
        
        
      });
  }
  function subscribe(subscription) {
    return fetch('https://strong-ties.herokuapp.com/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {'content-type': 'application/json'}
    });
  }
  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}