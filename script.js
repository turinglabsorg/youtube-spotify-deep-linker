function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function redirectToApp() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Get the service and original link from URL parameters
    const service = getParameterByName("service");
    const originalLink = getParameterByName("link");
    if (service !== undefined && originalLink !== undefined && service !== null && originalLink !== null) {
        try {
            if (/android/i.test(userAgent)) {
                // Android URLs
                if (service === "youtube") {
                    window.location = "vnd.youtube://" + originalLink;
                } else if (service === "spotify") {
                    window.location = "https://open.spotify.com/track/" + originalLink + "?context=spotify:playlist:0TbbXnfX6Rtour71ojHhNl&si=75dc896f08184bd1";
                }
            } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                // iOS URLs
                if (service === "youtube") {
                    window.location = "youtube://" + originalLink;
                } else if (service === "spotify") {
                    window.location = "spotify://track/" + originalLink + "?context=spotify:playlist:0TbbXnfX6Rtour71ojHhNl&si=75dc896f08184bd1";
                }
            } else {
                if (service === "youtube") {
                    window.location = "https://youtube.com/watch?v=" + originalLink;
                } else if (service === "spotify") {
                    window.location = "https://open.spotify.com/track/" + originalLink + "?context=spotify:playlist:0TbbXnfX6Rtour71ojHhNl&si=75dc896f08184bd1";
                }
            }
        } catch (e) {
            console.log(e.message)
            setTimeout(function () {
                if (service === "youtube") {
                    window.location = "https://youtube.com/watch?v=" + originalLink;
                } else if (service === "spotify") {
                    window.location = "https://open.spotify.com/track/" + originalLink + "?context=spotify:playlist:0TbbXnfX6Rtour71ojHhNl&si=75dc896f08184bd1";
                }
            }, 2500)
        }
    }
}

// Call the function to perform the redirection
redirectToApp();
