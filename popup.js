import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  let storeprice,
    storetitle,
    storerating,
    storereviews,
    storedescription,
    storeimage = "";
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  console.log(queryParameters);
  const urlParameters = new URLSearchParams(queryParameters);
  console.log(urlParameters);
  const currentVideo = urlParameters.get("sbo");
  console.log(currentVideo);
  if (
    activeTab.url.includes("aliexpress.com") ||
    activeTab.url.includes("amazon.com") ||
    activeTab.url.includes("localhost:3000")
  ) {
    const container = document.getElementsByClassName("container")[0];
    const title = document.getElementsByClassName("title")[0];
    const description = document.getElementsByClassName("description")[0];
    const price = document.getElementsByClassName("price")[0];
    const rating = document.getElementsByClassName("rating")[0];
    const reviews = document.getElementsByClassName("reviews")[0];
    const image = document.getElementsByClassName("image")[0];
    const btn = document.getElementsByClassName("btn-product")[0];

    btn.addEventListener("click", async () => {
      const productdata = {
        storeprice,
        storetitle,
        storerating,
        storereviews,
        storedescription,
        storeimage,
      };
      // const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
      const activeTab = await getActiveTabURL();

      chrome.tabs.sendMessage(activeTab.id, {
        type: "addproduct",
        value: productdata,
      });

      console.log(storetitle);
      // console.log(title1);
      // title1.value = storetitle;
      // price1.value = storeprice;
      // description1.value = storedescription;
      // rating1.value = storerating;
      // reviews1.value = storereviews;
      // image1.src = storeimage;
    });

    chrome.storage.local.get(["title"], function (result) {
      console.log(result);
      title.innerText = result.title;
      storetitle = result.title;
    });

    chrome.storage.local.get(["description"], function (result) {
      description.innerHTML = result.description;
      storedescription = result.description;
    });
    chrome.storage.local.get(["price"], function (result) {
      console.log(result);
      price.innerHTML = result.price;
      storeprice = result.price;
    });
    chrome.storage.local.get(["image"], function (result) {
      console.log(result);
      image.src = result.image;
      storeimage = result.image;
    });
    chrome.storage.local.get(["rating"], function (result) {
      console.log(result);
      rating.innerHTML = result.rating;
      storerating = result.rating;
    });
    chrome.storage.local.get(["reviews"], function (result) {
      console.log(result);
      reviews.innerHTML = result.reviews;
      storereviews = result.reviews;
    });

    // }
    chrome.storage.sync.get([currentVideo], (data) => {
      console.log(data);
      // const currentVideoBookmarks = data[currentVideo]
      //   ? JSON.parse(data[currentVideo])
      //   : [];
      // viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">This is not a default page.</div>';
  }
});
