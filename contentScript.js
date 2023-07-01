(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "1";
    let currentVideoBookmarks = [];
    let title = "";
    let price = 0;
    let description = "";
    let reviews = 0;
    let rating = 0;
    let image = "";

    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    const addNewBookmarkEventHandler = async() => {
        title = document.querySelector("span#productTitle").textContent;
        image = document.querySelector("img#landingImage").src;
        price = document.querySelector("span.a-price span.a-offscreen").innerText;
        reviews = document
            .querySelector("span#acrCustomerReviewText")
            .innerText.split(" ")[0];
        rating = document.querySelector("i.a-star-5 span").innerText.split(" ")[0];
        description = document.querySelector(
            "div#feature-bullets ul.a-unordered-list"
        ).innerText;

        chrome.storage.local.set({ title: title }, function(result) {
            console.log(result);
        });
        chrome.storage.local.set({ image: image }, function(result) {
            console.log(result);
        });
        chrome.storage.local.set({ price: price }, function(result) {
            console.log(result);
        });
        chrome.storage.local.set({ reviews: reviews }, function(result) {
            console.log(result);
        });
        chrome.storage.local.set({ rating: rating }, function(result) {
            console.log(result);
        });
        chrome.storage.local.set({ description: description }, function(result) {
            console.log(result);
        });
        let data = {
            title,
            image,
            price,
            reviews,
            rating,
            description,
        };
        document.querySelector("span#productTitle").innerHTML =
            "pakistan zaindabad";
        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([data]),
        });

        // const currentTime = youtubePlayer.currentTime;
        // const newBookmark = {
        //   time: currentTime,
        //   desc: "Bookmark at " + getTime(currentTime),
        // };
        // // console.log(newBookmark);

        // currentVideoBookmarks = await fetchBookmarks();

        // chrome.storage.local.get(["key"], function (result) {
        //   console.log("Value currently is " + result.key);
        // });

        // chrome.storage.sync.set({
        //   [currentVideo]: JSON.stringify(
        //     [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
        //   ),
        // });
    };

    const newVideoLoaded = async() => {
        console.log(currentVideo);

        const navbar = document.querySelector("div#nav-xshop");
        console.log(navbar);

        const btn = document.createElement("img");

        btn.src = chrome.runtime.getURL("assets/bookmark.png");
        btn.className = "ytp-button " + "bookmark-btn";
        btn.title = "Click to bookmark current timestamp";
        btn.style.width = "34px";
        btn.style.height = "34px";
        btn.style.cursor = "pointer";
        btn.style.margin = "3px 5px";

        const title1 = document.querySelector("input[name = name]");
        console.log(title1);

        const price1 = document.querySelector("input[name = 'price']");
        const description1 = document.querySelector("input[name = 'description']");
        const rating1 = document.querySelector("input[name = 'rating']");
        const reviews1 = document.querySelector("input[name = 'reviews']");

        const image1 = document.querySelector("input[name = 'image']");
        const pak = document.getElementsByClassName("MuiInputBase-input");
        console.log(pak);
        const pak1 = document.getElementsByClassName("pakistan");
        const pak2 = document.querySelectorAll("input.pakistan");

        console.log(pak1[1]);
        console.log(pak2);
        const datt = document.querySelector("input[type = text]");
        console.log(datt);
        // const title = document.querySelector("h1[data-pl='product-title']");
        // console.log(title);
        console.log(document.querySelector('input[id="outlined-required"]'));
        // console.log(title1);
        // console.log(price1);
        // price1.value = 878798;
        // currentVideoBookmarks = await fetchBookmarks();

        // if (!bookmarkBtnExists) {
        //   const bookmarkBtn = document.createElement("img");

        //   bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
        //   bookmarkBtn.className = "ytp-button " + "bookmark-btn";
        //   bookmarkBtn.title = "Click to bookmark current timestamp";

        //   youtubeLeftControls =
        //     document.getElementsByClassName("ytp-left-controls")[0];
        //   youtubePlayer = document.getElementsByClassName("video-stream")[0];

        navbar.appendChild(btn);
        btn.addEventListener("click", addNewBookmarkEventHandler);
        // }
    };
    newVideoLoaded();

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;
        if (type === "addproduct") {
            console.log(value);
        }
        // if (type === "NEW") {
        //   currentVideo = videoId;
        //   console.log({ type, value, videoId });
        //   newVideoLoaded();
        // } else if (type === "PLAY") {
        //   youtubePlayer.currentTime = value;
        // } else if (type === "DELETE") {
        //   currentVideoBookmarks = currentVideoBookmarks.filter(
        //     (b) => b.time != value
        //   );
        //   chrome.storage.sync.set({
        //     [currentVideo]: JSON.stringify(currentVideoBookmarks),
        //   });

        //   response(currentVideoBookmarks);
        // }
    });
})();

const getTime = (t) => {
    var date = new Date(0);
    // date.setSeconds(t);
    date = Math.floor(t / 60) + ":" + ("0" + Math.floor(t % 60)).slice(-2);

    return date;
};