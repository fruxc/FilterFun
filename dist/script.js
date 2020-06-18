var image = null;
var file = document.getElementById("finput");
var canvas = document.getElementById("canvas");

function uploadImage(){
  image = new SimpleImage(file);
  image.drawTo(canvas);
}

function size(x){
  var lbl = document.getElementById("lbl");
  lbl.innerHTML = x.getHeight()+" x "+x.getWidth();
}

function makeGray(){
  var output = image;
  for(var pixel of output.values()){
    var avg = ((pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3);
    pixel.setGreen(avg);
    pixel.setRed(avg);
    pixel.setBlue(avg);
  }
  output.drawTo(canvas);
  size(output);
}

function makeRainbow(){
  var output = image;
  var h = output.getHeight();
  for(var pixel of output.values()){
    var y = pixel.getY();
    if(y<=h/7){
      pixel.setRed(255);
    }else if(y>=h/7 && y<=2*h/7){
      pixel.setRed(255);
      pixel.setGreen(127);
    }else if(y>=2*h/7 && y<=3*h/7){
      pixel.setRed(255);
      pixel.setGreen(255);
    }else if(y>=3*h/7 && y<=4*h/7){
      pixel.setGreen(255);
    }else if(y>=4*h/7 && y<=5*h/7){
      pixel.setBlue(255);
    }else if(y>=5*h/7 && y<=6*h/7){
      pixel.setRed(46);
      pixel.setGreen(43);
      pixel.setBlue(95);
    }else{
      pixel.setRed(139);
      pixel.setBlue(255);
    }
  }
  output.drawTo(canvas);
  size(output);
}

function makeRed(){
  var output = image;
  for(var pixel of output.values()){
    var avg = (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
    if( avg < 128){
      pixel.setRed(avg*2);
      pixel.setGreen(0);
      pixel.setBlue(0)
    }else{
      pixel.setRed(255);
      pixel.setGreen((2*avg)-255);
      pixel.setBlue((2*avg)-255);
    }
  }
  output.drawTo(canvas);
  size(output);
}

function makeBlur(){
  var blurInput = document.getElementById("blur");
  var ctx = canvas.getContext("2d");
  ctx.globalAlpha = 0.5;
  var strength = blurInput.value;
  for (var y = -strength; y <= strength; y += 2) {
    for (var x = -strength; x <= strength; x += 2){
      ctx.drawImage(canvas, x, y);
    }
  }
  ctx.globalAlpha = 1.0;  
  size(image);
}

function tryNew(){
  var output = new SimpleImage(image.getWidth()+10,image.getHeight()+10);
  for(var pixel of output.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    var h = image.getHeight();
    var w = image.getWidth();
    if(x<=10){
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(255);
    }
    else if(y<=10){
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(255);
    }
    else if(x>=w/2 && x<=(w/2)+10){
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(255);
    }
    else if(y>=h/2 && y<=(h/2)+10){
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(255);
    }
    else if(x>w){
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(255);
    }
    else if(y>h){
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(255);
    }
    else{
      var bgPixel = image.getPixel(x-10,y-10);
      output.setPixel(x, y, bgPixel);
    }
  }
  output.drawTo(canvas);
  size(output);
}

function clearCanvas() {
  doClear(canvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function resetImage(){
  clearCanvas();
  uploadImage();
}