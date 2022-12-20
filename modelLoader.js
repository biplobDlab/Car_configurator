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
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V1.png',// change it ot public link
    name: 'Blue',
    uid: null
  },
  'texture2': {
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V2.png',
    name: 'Black',
    uid: null
  },
  'texture3': {
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V3.png',
    name: 'Red',
    uid: null
  }
};
const Headliner = {
  'texture1': {
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V1.png',// change it ot public link
    name: 'Blue',
    uid: null
  },
  'texture2': {
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V2.png',
    name: 'Black',
    uid: null
  },
  'texture3': {
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V3.png',
    name: 'Red',
    uid: null
  }
};
const Midliner = {
  'texture1': {
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V1.png',// change it ot public link
    name: 'Blue',
    uid: null
  },
  'texture2': {
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V2.png',
    name: 'Black',
    uid: null
  },
  'texture3': {
    url: 'https://raw.githubusercontent.com/BiplobModak/ProductConfigurator/main/images/BodyPaint_ABS_BaseColor_V3.png',
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
var seatMatrial;
var bodyMatrial;
var renderChagnel;
var nodes;
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

var success = function success(api) {
  apiSkfb = api;
  api.start(function () {
    api.addEventListener('viewerready', function () {
      ////////////////////////////////////////////
      // ANIMATION: WAIT FOR LOADING ////////////
      //////////////////////////////////////////
      api.getAnimations(function (err, animations) {
        console.log(animations);
        animationsList = animations;
        api.pause();
      });

      api.getMaterialList((err, materials) => {
        material = materials[5]; // There's only one material in this case
        allMatrials = materials;
        console.log(allMatrials[0].channels.AlbedoPBR.color);
        console.log(allMatrials);

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
        }
      });

      // buttons start here
      var checkbox = document.querySelectorAll('input[type="checkbox"]');
      for (let j = 0; j < checkbox.length; j++) {
        checkbox[j].addEventListener('change', function () {
          if (checkbox[j].checked) {
            //api.play();
            OpenGates(false);
          }
          else {
            //api.pause();
            OpenGates(true);
          }
        });

      }

      api.addEventListener('animationEnded', function () {
        api.pause();
      });
    });
  });
};



client.init(uid, {
  success: success,
  error: error,
  autostart: 1,
  preload: 1
});

function colorCheck(e) {
  console.log(e.id);
  var text = e.id;
  //text = text.slice(0, -1);
  var buttons = document.getElementsByClassName("color-button");
  for (let j = 0; j < buttons.length; j++) {
    var currentid = buttons[j].id;
    //currentid = currentid.slice(0, -1);
    if (currentid === text) {
      e.style.border = "solid 3px rgba(255, 255, 255, 1)";
      document.getElementById(text + "-child").style.opacity = 1;
      //convert
      console.log(e.getAttribute("color"));
      ChangeColor(e.getAttribute("color"));
    }
    else {
      buttons[j].style.border = "solid 3px rgba(255, 255, 255, 0)";
      document.getElementById(buttons[j].id + "-child").style.opacity = 0;
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


function ChangeColor(color) {
  
  let mat = allMatrials[0];

  mat.channels.AlbedoPBR.color =color;
  mat.channels.AlbedoPBR.enable = true;
  
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

var animaitonRunning = false;
function OpenGates(value) {
  if (animaitonRunning) {
    return;
  }

  //get animation
  if (value) {
    //close
    apiSkfb.setCurrentAnimationByUID(animationsList[0]);
    apiSkfb.play();
    animaitonRunning = true;
    openAnimation = setInterval(() => {
      apiSkfb.getCurrentTime(function (err, time) {
        if (time > 4) {
          apiSkfb.pause();
          //clearInterval(openAnimaton);
          animaitonRunning = false;
        }

      });
    }, 7);
  }
  else {
    //open
    apiSkfb.setCurrentAnimationByUID(animationsList[1]);
    apiSkfb.play();
    animaitonRunning = true;
    closeAnimation = setInterval(() => {
      apiSkfb.getCurrentTime(function (err, time) {
        if (time >= 7) {
          apiSkfb.pause();
          //clearInterval(closeAnimation);
          animaitonRunning = false;
        }
      });

    }, 7);

    //sick to 0 time
  }
}




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