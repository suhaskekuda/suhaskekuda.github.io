xgallery_images = [
 {
    url: "images/photography/p1.jpeg",
    prompt: "Just as one candle lights another and can light thousands of other candles, so one heart illuminates another heart and can illuminate thousands of other hearts.",
    date: "",
    tags: "Lamp"
  },
  {
    url: "images/photography/p2.jpeg",
    prompt: "All I need is a good dose of vitamin sea",
    date: "",
    tags: "Kodi beach"
  }
];


$(document).ready(function () {
  // SHUFFLE THE GALLERY
  shuffle(xgallery_images);

  // LOAD IMAGES INTO GALLERY
  xgallery_images.forEach(function (xg_image, i) {
    $(".xg-container").append(createXGImage(xg_image, i));
  });

  // HOVER GALLERY IMAGE
  $(".xg-img-wrap").mouseenter(function () {
    var el = $(this);
    var to = setTimeout(function () {
      el.find(".xg-img-info").addClass("xg-img-info-open");
    }, 100);
    el.mouseleave(function () {
      clearInterval(to);
      el.find(".xg-img-info").removeClass("xg-img-info-open");
    });
  });


  // FILTER BUTTON CLICK
  $(".xg-btn-tag").on("click", function () {
    if ($(this).hasClass("xg-btn-active")) {
      return;
    }
    var tagFilter = $(this).data("tag");
    $(".xg-btn-tag").removeClass("xg-btn-active");
    $(this).addClass("xg-btn-active");

    $(".xg-loader").fadeIn(100);

    if (tagFilter == "all") {
      $(".xg-img-wrap").fadeIn(100);
    } else {
      $(".xg-img-wrap").fadeIn(100);
      $(".xg-img-wrap").each(function (i, el) {
        if (!$(el).data("tags").includes(tagFilter))
          $(el).fadeOut(100);
      });
    }
    $(".xg-loader").delay(500).fadeOut(100);
  });



  // OPEN IMAGE PREVIEW
  $(".xg-img-wrap").on("click", function () {
    var id = $(this).data("index");

    $("body").addClass("scroll-fixed");

    $(".xg-img-preview").fadeIn(100);
    $(".xg-img-preview").html(createXGImagePreview(xgallery_images[id]));
  });


  // ZOOM IN IMAGE PREVIEW
  $(document).on("click", ".xgp-img", function () {
    $(".xgp-close").toggleClass("x-cloak");
    $(this).closest(".xgp-img-inner").siblings(".xgp-details").fadeToggle(100);
    $(this).closest(".xgp-img-inner").toggleClass("xgp-zoomed-inner");
    $(this).toggleClass("xgp-zoomed");
    $(".xgp-wrap").toggleClass("xg-overflow");
  });


  // CLOSE PREVIEW - ESCAPE
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $("body").removeClass("scroll-fixed");

      $(".xg-img-preview").fadeOut(100);
    }
  });



  // CLOSE PREVIEW - CLICK
  $(document).on("click", ".xgp-close", function (e) {
    $("body").removeClass("scroll-fixed");

    $(".xg-img-preview").fadeOut(100);
  });
});



function createXGImagePreview(xgi) {
  var xg_img =
    '<div class="xgp-wrap">\
  <div class="xgp-close"></div>\
  <div class="xgp-img-inner">\
  <img draggable="false" class="xgp-img" src="'+ xgi.url + '">\
  </div>\
  <div class="xgp-details">\
  <div class="xgp-prompt">'+ xgi.prompt + '</div>\
  <div class="xgp-date">'+ xgi.date + '</div>\
  <div class="xgp-tags">\
  <div class="xgp-tag">'+ xgi.tags + '</div>\
  </div>\
  </div>';

  return xg_img;
}

function createXGImage(xgi, i) {
  var xg_img =
    '<div class="xg-img-wrap" data-tags="' + xgi.tags + '" data-index="' + i + '">\
  <div class="xg-img-info">\
  <div class="xg-img-info-inner">\
  <div class="xg-img-prompt">'+ xgi.prompt + '</div>\
  <div class="xg-img-date">'+ xgi.date + '</div>\
  </div>\
  </div>\
  <img draggable="false" class="xg-img" src="'+ xgi.url + '">\
  </div>';

  return xg_img;
}


function shuffle(arr) {
  let index = arr.length, randomIndex;
  while (index != 0) {
    randomIndex = Math.floor(Math.random() * index);
    index--;

    [arr[index], arr[randomIndex]] = [
      arr[randomIndex], arr[index]];
  }

  return arr;
}