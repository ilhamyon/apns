import React from 'react';

class SafariPushNotification extends React.Component {
  handleAllowPush = (e) => {
    e.preventDefault();

    // Ensure that the user can receive Safari Push Notifications.
    if ('safari' in window && 'pushNotification' in window.safari) {
      const permissionData = window.safari.pushNotification.permission('web.yourdomain.com');
      this.checkRemotePermission(permissionData);
    }
  };

  checkRemotePermission = (permissionData) => {
    if (permissionData.permission === 'default') {
      // This is a new web service URL, and its validity is unknown.
      window.safari.pushNotification.requestPermission(
        'https://yourdomain.com', // The web service URL.
        'web.yourdomain.com', // The Website Push ID.
        {}, // Data that you choose to send to your server to help you identify the user.
        this.checkRemotePermission // The callback function.
      );
    } else if (permissionData.permission === 'denied') {
      console.log('The user said no.');
    } else if (permissionData.permission === 'granted') {
      console.log("The user said yes, with token: " + permissionData.deviceToken);
    }
  };

  render() {
    return (
      <div>
        <button id="allow_push" onClick={this.handleAllowPush}>
          Allow Push
        </button>
      </div>
    );
  }
}

export default SafariPushNotification;
