// Sketchfab Viewer API: Start/Stop/Control Animation

var version = '1.12.1';
var uid = '778e73c5af874b6599b846c446aebc19';
var iframe = document.getElementById('api-frame');
var client = new window.Sketchfab(version, iframe);

var error = function error() {
  console.error('Sketchfab API error');
};

// scatchfab api
let api;
// material
let material;


// for dinamic chage it to list or arrey or struct list
const Seat = {
  'texture1': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Seat_BC_V1.jpg',// change it ot public link
    name: 'Blue',
    uid: null
  },
  'texture2': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Seat_BC_V2.jpg',
    name: 'Black',
    uid: null
  },
  'texture3': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Seat_BC_v3.jpg',
    name: 'Red',
    uid: null
  }
};
const Headliner = {
  'texture1': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Headliner_BC_V1.jpg',// change it ot public link
    name: 'Blue',
    uid: null
  },
  'texture2': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Headliner_BC_V2.jpg',
    name: 'Black',
    uid: null
  },
  'texture3': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Headliner_BC_V3.jpg',
    name: 'Red',
    uid: null
  }
};
const Midliner = {
  'texture1': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Midliner_BC_V1.jpg',// change it ot public link
    name: 'Blue',
    uid: null
  },
  'texture2': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Midliner_BC_V2.jpg',
    name: 'Black',
    uid: null
  },
  'texture3': {
    url: 'https://raw.githubusercontent.com/biplobDlab/Car_configurator/main/images/carcolor/Textures/Int_Midliner_BC_V3.jpg',
    name: 'Red',
    uid: null
  }
};


var _pollTime, duration;

var timeSlider;
var isSeeking;
var animationsList;
var current_anim;
var apiSkfb;
//my code
var allMatrials = [];
_pollTime = function pollTime() {
  apiSkfb.getCurrentTime(function (err, time) {
    if (!isSeeking) {
      var percentage = 100 * time / duration;
      timeSlider.value = percentage;
    }
    requestAnimationFrame(_pollTime);
  });
};

var pingpong = false;
var timeFactor = 1.0;
var time;


var easings = ['easeLinear', 'easeOutQuad', 'easeInQuad', 'easeInOutQuad', 'easeOutCubic', 'easeInCubic', 'easeInOutCubic', 'easeOutQuart', 'easeInQuart', 'easeInOutQuart', 'easeOutQuintic', 'easeInQuintic', 'easeInOutQuintic', 'easeOutSextic', 'easeInSextic', 'easeInOutSextic', 'easeOutSeptic', 'easeInSeptic', 'easeInOutSeptic', 'easeOutOctic', 'easeInOctic', 'easeInOutOctic', 'easeOutBack', 'easeInBack', 'easeInOutBack', 'easeOutCircle', 'easeInCircle', 'easeInOutCircle', 'easeOutElastic', 'easeInElastic', 'easeInOutElastic', 'easeOutBounce',
  'easeInBounce', 'easeInOutBounce'];





var success = function success(api) {
  apiSkfb = api;
  api.start(function () {

    api.addEventListener('viewerready', function () {
      ////////////////////////////////////////////
      // ANIMATION: WAIT FOR LOADING ////////////
      //////////////////////////////////////////

      // hide on click

      //pickEveryOtherFrame();



      api.getAnimations(function (err, animations) {
        console.log(animations);
        animationsList = animations;
        api.pause();
        var checkbox = document.querySelectorAll('input[type="checkbox"]');
        for (let j = 0; j < checkbox.length; j++) {
          checkbox[j].addEventListener('change', function () {
            if (checkbox[j].checked) {
              //process.exit(0);
              changeAnimation(1, checkbox[j]);
            }
            else {
              //process.exit(0);
              changeAnimation(0, checkbox[j]);
            }
          });
        }
      });
      //white background
      api.getMaterialList((err, materials) => {


        
        // function hexToRgb(e) {
        //   var t = e.match(/^#([0-9a-f]{6})$/i);
        //   if (t)
        
        //     return [parseInt(t[1].substr(0, 2), 16) / 256, parseInt(t[1].substr(2, 2), 16) / 256, parseInt(t[1].substr(4, 2), 16) / 256];
        //   throw new Error("Invalid color: " + e)
        // }
        //var hex2 = hexToRgb("#131B26");
        //api.setBackground({ color: [hex2[0], hex2[1], hex2[2]] }, null);
        //material = materials[5]; // There's only one material in this case
        allMatrials = materials;

        for (const texture in Seat) {
          api.addTexture(Seat[texture].url, (err, uid) => {
            if (!err) {
              Seat[texture].uid = uid;

              window.console.log(`Registered new texture, ${Seat[texture].name}, uid: ${uid}`);

              //var elements = document.getElementsByClassName(`texture-${texture}`);

            }
          });
        }
        for (const texture in Midliner) {
          api.addTexture(Midliner[texture].url, (err, uid) => {
            if (!err) {
              Midliner[texture].uid = uid;

              window.console.log(`Registered new texture, ${Midliner[texture].name}, uid: ${uid}`);

              //var elements = document.getElementsByClassName(`texture-${texture}`);

            }
          });
        }
        for (const texture in Headliner) {
          api.addTexture(Headliner[texture].url, (err, uid) => {
            if (!err) {
              Headliner[texture].uid = uid;

              window.console.log(`Registered new texture, ${Headliner[texture].name}, uid: ${uid}`);

              //var elements = document.getElementsByClassName(`texture-${texture}`);

            }
          });
        }
      });

      api.getNodeMap(function (err, nodes) {
        if (!err) {
          console.log(nodes);
          document.getElementById("rim1").onclick();
          document.getElementById("texture1").onclick();
          document.getElementById("Blue1").onclick();
        }
      });
      // Animations start here
      api.addEventListener('animationEnded', function () {
        animationChangePlay = false;
      });
    });
  });
};



client.init(uid, {
  success: success,
  error: error,
  autostart: 1,
  preload: 1,
  ui_controls: 0,
  transparent: 1
});

function colorCheck(e) {
  console.log(e.id);
  var text = e.id;
  text = text.slice(0, -1);
  var buttons = document.getElementsByClassName("color-button");
  for (let j = 0; j < buttons.length; j++) {
    var currentid = buttons[j].id;
    currentid = currentid.slice(0, -1);
    if (currentid === text) {
      //e.style.border = "solid 3px rgba(255, 255, 255, 1)";
      document.getElementById(text + "1").style.border = "solid 3px rgba(255, 255, 255, 1)";
      document.getElementById(text + "2").style.border = "solid 3px rgba(255, 255, 255, 1)";

      document.getElementById(text + "1-child").style.opacity = 1;
      document.getElementById(text + "2-child").style.opacity = 1;

      console.log(e.getAttribute("color"));
      console.log("bg " + e.getAttribute("bg"));

      ChangeColor(e.getAttribute("color"), e.getAttribute("bg"));
    }
    else {
      buttons[j].style.border = "solid 3px rgba(255, 255, 255, 0)";
      document.getElementById(currentid + "1-child").style.opacity = 0;
      document.getElementById(currentid + "2-child").style.opacity = 0;
    }
  }

}
function textureCheck(e) {
  console.log(e.id);
  var text = e.id;
  var buttons = document.getElementsByClassName("texture-button");
  for (let j = 0; j < buttons.length; j++) {
    var currentid = buttons[j].id;
    if (currentid === text) {
      e.style.border = "solid 5px rgba(224, 218, 218, 1)";
      var Seat_uid = Seat[e.id];
      var headliner_uid = Headliner[e.id];
      var midliner_uid = Midliner[e.id];
      ChangeTexture(Seat_uid, headliner_uid, midliner_uid);
    }
    else {
      buttons[j].style.border = "solid 5px rgba(224, 218, 218, 0)";
    }
  }

}

function rimCheck(e) {
  var text = e.id;

  var buttons = document.getElementsByClassName("rim-button");
  for (let j = 0; j < buttons.length; j++) {
    var currentid = buttons[j].id;
    if (currentid === text) {
      e.style.opacity = 1;
      //console.log(e.value);
      var value = e.getAttribute("value_id");
      showRim(value);
    }
    else {
      buttons[j].style.opacity = .5;
      var value = buttons[j].getAttribute("value_id");
      hideRim(value);
    }
  }

}

//converting hex to linier
function hexToRgb(e) {
  var t = e.match(/^#([0-9a-f]{6})$/i);
  if (t)

    return [parseInt(t[1].substr(0, 2), 16) / 256, parseInt(t[1].substr(2, 2), 16) / 256, parseInt(t[1].substr(4, 2), 16) / 256];
  throw new Error("Invalid color: " + e)
}
//value incription
function a(e) {
  var n = 2.4;
  var t = 0;
  return e < .04045 ?
    e >= 0 && (t = e * (1 / 12.92)) :
    t = Math.pow((e + .055) * (1 / 1.055), n),
    t
}

//converting linier to argb
function srgbToLinear(e) {
  var r = new Array(e.length);
  if (!(e.length > 2 && e.length < 5))
    throw new Error("Invalid color. Expected 3 or 4 components, but got " + e.length);
  return r[0] = a(e[0]),
    r[1] = a(e[1]),
    r[2] = a(e[2]),
    r.length > 3 && e.length > 3 && (r[3] = e[3]),
    r
}


function ChangeColor(color, bg) {

  let mat = allMatrials[0];
  var hex = hexToRgb(color);
  var srgb = srgbToLinear(hex);

  // var he = hexToRgb("#131B26");
  // var hex2 = srgbToLinear(he);

  mat.channels.AlbedoPBR.color = srgb;
  mat.channels.AlbedoPBR.enable = true;
  console.log(mat.channels.AlbedoPBR.color);

  apiSkfb.setMaterial(mat, () => { });
}

function ChangeTexture(uid1, uid2, uid3) {
  let mat1 = allMatrials[1];

  let mat2 = allMatrials[9];
  let mat3 = allMatrials[3]

  mat1.channels.AlbedoPBR.texture.uid = uid1;
  mat1.channels.AlbedoPBR.enable = true;
  apiSkfb.setMaterial(mat1, () => { });

  mat2.channels.AlbedoPBR.texture.uid = uid2;
  mat2.channels.AlbedoPBR.enable = true;
  apiSkfb.setMaterial(mat2, () => { });

  mat3.channels.AlbedoPBR.texture.uid = uid3;
  mat3.channels.AlbedoPBR.enable = true;
  apiSkfb.setMaterial(mat3, () => { });
}

function showRim(id) {
  apiSkfb.show(id, function (err) {
    if (!err) {
      window.console.log('Showed node', id); // 114
    }

  });
}
function hideRim(id) {
  apiSkfb.hide(id, function (err) {
    if (!err) {
      window.console.log('Hid node', id); // 114
    }
  });
}

//page buttons 
$("#TextureSection").click(
  function textureActivate() {
    $("#TextureSection").addClass('selected');
    $("#BodyPainSection").removeClass('selected')
    $("#RimSection").removeClass('selected');

    $("#BodyPainButotnContainer").addClass('d-none');
    $("#RimButotnContainer").addClass('d-none');
    $("#TextureButotnContainer").removeClass('d-none');
    return
  });

$("#RimSection").click(
  function RimActivate() {
    $("#TextureSection").removeClass('selected');
    $("#BodyPainSection").removeClass('selected')
    $("#RimSection").addClass('selected');
    $("#BodyPainButotnContainer").addClass('d-none');
    $("#RimButotnContainer").removeClass('d-none');
    $("#TextureButotnContainer").addClass('d-none');
    return
  });

$("#BodyPainSection").click(
  function paintActivate() {
    $("#TextureSection").removeClass('selected');
    $("#BodyPainSection").addClass('selected')
    $("#RimSection").removeClass('selected');
    $("#BodyPainButotnContainer").removeClass('d-none');
    $("#RimButotnContainer").addClass('d-none');
    $("#TextureButotnContainer").addClass('d-none');
    return
  });



var animationChangePlay = false;
function changeAnimation(index, checkbox) {

  if (animationChangePlay) {
    var check = checkbox.checked;
    console.log(check);
    checkbox.checked = !check;
    checkbox.click();
    console.log(checkbox.checked);
    console.log("Returing");
    return;
  }

  current_anim = index;
  apiSkfb.setCurrentAnimationByUID(animationsList[index][0]);
  animationChangePlay = true;
  var duration = 1000 * animationsList[index][2];
  apiSkfb.play();
  apiSkfb.seekTo(0);
  apiSkfb.setCycleMode('one', function (err) {
    if (!err) {

    }
  });
  // var interval = setInterval(function () {
  //   apiSkfb.getCurrentTime(function(err, time){ 
  //     if (time <= duration) {
  //       console.log(time, duration);
  //       animationChangePlay = false;
  //       apiSkfb.pause();
  //       clearInterval(interval);
  //     }   
  //   });    
  // }, duration-50);

}

// api.addEventListener('click', function (info) {
//   var text = 'Clicked on ';

//   if (info && info.material) {
//     text += 'material "' + info.material.name + '"';
//     api.highlightMaterial(info.material);
//   } else {
//     text += 'background';
//     api.highlightMaterial();
//   }

//   updateText(text);
//   console.log(text);
//   setTimeout(function () {
//     updateText('no click');
//   }, 250);
// }, {
//   pick: 'fast'
// });
// });
// };