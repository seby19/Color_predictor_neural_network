
let r,g,b;
let nn;
let selection = "white";

function setup() {
    createCanvas(700,500);
    nn = new NeuralNetwork( 3 , 2 , 3);
    noLoop();

    // To train it to predict in a scripted way
    // for(j = 0; j < 10000; j++)
    // {   
    //     let r = Math.random() * 255;
    //     let g = Math.random() * 255;
    //     let b = Math.random() * 255;
    //     let expected = trainForColor(r , g , b);
    //     let inputs = [r/255 , g/255 , b/255];
    //     nn.train(inputs,expected);

    // }

    randomColor();
}

function randomColor() {
    r = Math.random() * 255;
    g = Math.random() * 255;
    b = Math.random() * 255;
    redraw();
}


function colorPredictor() {
    let inputs = [r/255 , g/255 , b/255];
    let outputs = nn.forwardProp(inputs);
    console.log(outputs);
    if(outputs[0] > outputs[1]) {
        return "black";
    } else {
        return "white";
    }
}

function mousePressed() {

    let expected;
    if(mouseX > width/2) {
        expected = [0 , 1];
    } else {
    
        expected = [1 , 0];
    }

    let inputs = [r/255 , g/255 , b/255];
    
    // To train when mouse clicked
    nn.train(inputs , expected); 
    randomColor();
}


function trainForColor(r , g ,b) {
    if(r + g + b > 300) {
        return [1 , 0];
    } else {
        return [0 , 1];
    }

}


function draw() {
    background(r,g,b);
    strokeWeight(4);
    stroke(255);
    line(width/2,0,width/2,height)


    textSize(70);
    noStroke();
    fill(0);
    textAlign(CENTER , CENTER);
    text("black",160,250)
    fill(255);
    text("white",520,250)
    selection = colorPredictor();
    console.log( r + g + b);
    if(selection == "black") {
        fill(0);
        ellipse(160 , 400 , 100)
    } else {
        fill(255);
        ellipse(520 , 400 , 100)
    }
}