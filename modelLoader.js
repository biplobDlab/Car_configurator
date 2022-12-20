// Sketchfab Viewer API: Start/Stop/Control Animation

var version = '1.12.1';
var uid = '1f2c28b1e69a4565b9fe5ced1cb556f3';
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
const textures = {
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

        // if (animations.length > 0) {
        //   current_anim = 0;
        //   api.setCurrentAnimationByUID(animations[current_anim][0]);
        //   duration = animations[current_anim][2];

        //   isSeeking = false;

        //   timeSlider = document.getElementById('timeSlider');

        //   _pollTime();

        //   timeSlider.addEventListener('change', function () {
        //     isSeeking = false;
        //     api.play();
        //   });

        //   timeSlider.addEventListener('input', function () {
        //     isSeeking = true;
        //     var time = duration * timeSlider.value / 100;
        //     api.pause();
        //     api.seekTo(time, function () {
        //       api.play();
        //     });
        //   });
        // }
      });

      api.getMaterialList((err, materials) => {
        material = materials[5]; // There's only one material in this case
        allMatrials = materials;
        console.log(allMatrials);

        for (const texture in textures) {
          api.addTexture(textures[texture].url, (err, uid) => {
            if (!err) {
              textures[texture].uid = uid;

              window.console.log(`Registered new texture, ${textures[texture].name}, uid: ${uid}`);

              var elements = document.getElementsByClassName(`texture-${texture}`);
              // for (var i = 0; i < elements.length; i++) {
              //   elements[i].addEventListener('click', () => {

              //     let materialToUpdate = material;
              //     materialToUpdate.channels.AlbedoPBR.texture.uid = textures[texture].uid;
              //     materialToUpdate.channels.AlbedoPBR.enable = true;
              //     console.log("matrialCheck");
              //     //displeCheck(elements[i]);
              //     api.setMaterial(materialToUpdate, () => {


              //     });
              //   });
              // }
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

      // check ids.
      // document.getElementById('play').addEventListener('click', function () {
      //   api.play();
      // });
      // document.getElementById('pause').addEventListener('click', function () {
      //   api.pause();
      // });
      // document.getElementById('pingpong').addEventListener('click', function () {
      //   pingpong = !pingpong;
      // });

      // document.getElementById('previous').addEventListener('click', function () {
      //   if (current_anim === 0) current_anim = animationsList.length;
      //   current_anim--;
      //   api.setCurrentAnimationByUID(animationsList[current_anim][0]);
      //   api.seekTo(0);
      //   duration = animationsList[current_anim][2];
      //   console.log(duration);
      // });

      // document.getElementById('next').addEventListener('click', function () {
      //   current_anim++;
      //   if (current_anim === animationsList.length) current_anim = 0;
      //   api.setCurrentAnimationByUID(animationsList[current_anim][0]);
      //   api.seekTo(0);
      //   duration = animationsList[current_anim][2];
      //   console.log(duration);
      // });

      // api.addEventListener('animationChange', function (a) {
      //   current_anim = 0;

      //   for (var i = 0; i < animationsList.length; i++) {
      //     if (animationsList[i][0] === a) {
      //       duration = animationsList[i][2];
      //       current_anim = i;
      //       break;
      //     }
      //   }

      //   console.log('animationChange', a);
      // });

      api.addEventListener('animationEnded', function () {
        api.pause();
      });
      // api.addEventListener('animationPlay', function () {
      //   console.log('animationPlay');
      // });
      // api.addEventListener('animationStop', function () {
      //   console.log('animationStop');
      // });

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
      ChangeColor(e.value);
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
      var temp_uid = textures[e.id];
      ChangeTexture(temp_uid);
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
      var value = e.getAttribute("value_id")
      showRim(value);
    }
    else {
      buttons[j].style.opacity = .5;
      var value = buttons[j].getAttribute("value_id")
      hideRim(value);
    }
  }

}

function ChangeColor(color) {
  let materialToUpdate = allMatrials[3];
  materialToUpdate.channels.AlbedoPBR.color = color;
  materialToUpdate.channels.AlbedoPBR.enable = true;
  apiSkfb.setMaterial(materialToUpdate, () => { });
}
function ChangeTexture(uid) {
  let mat1 = allMatrials[7];
  
  let mat2 = allMatrials[1];
  let mat3 = allMatrials[4]

  mat1.channels.AlbedoPBR.texture.uid = uid;
  mat1.channels.AlbedoPBR.enable = true;
  apiSkfb.setMaterial(mat1, () => { });
  
  mat2.channels.AlbedoPBR.texture.uid = uid;
  mat2.channels.AlbedoPBR.enable = true;
  apiSkfb.setMaterial(mat2, () => { });
  
  mat3.channels.AlbedoPBR.texture.uid = uid;
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
function OpenGates(value)
{
  if(animaitonRunning)
  {
    return;
  }

  var animetion = animationsList[0];  
  apiSkfb.setCurrentAnimationByUID(animetion[0]);
  //get animation
  if(value)
  {
    //close
    apiSkfb.seekTo(0);
    apiSkfb.play();
    animaitonRunning = true;
    opened = false;
    openAnimation = setInterval(() => {
      apiSkfb.getCurrentTime(function(err, time)
      {
        if(time > 4)
        {
          apiSkfb.pause();
          //clearInterval(openAnimaton);
          animaitonRunning = false;
        }

      });      
    }, 7);
  }
  else
  {
    //open
    apiSkfb.seekTo(4);
    apiSkfb.play();
    animaitonRunning = true;
    closeAnimation = setInterval(() => 
    {
      apiSkfb.getCurrentTime(function(err, time){
        if(time >= 7)
        {
          apiSkfb.pause();
          //clearInterval(closeAnimation);
          animaitonRunning = false;
        }
      });
      
    }, 7);

    //sick to 0 time
  }
}