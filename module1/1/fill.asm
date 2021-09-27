// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

@8128
D=A
@fin
M=D

@state
M=0

@KEY
0;JMP

// START FILL
// get current color
(FILL)
@state
D=M

@i
M=0

@SCREEN
D=A
@addr
M=D

(LOOP)
// filling logic

@i
D=M
@fin
D=M-D
@KEY
D;JEQ

@i
D=M

@addr
A=M+D
D=A

@finaladdr
M=D

@state
D=M

@finaladdr
A=M
M=D

@i
M=M+1
D=M

@LOOP
0;JMP

// END FILL

// START FILL BLACK
(FILLBLACK)
@state
D=M+1

// if already black -> do nothing
@KEY
D;JEQ

// change state to black
@state
M=-1
@FILL
0;JMP
// END FILL BLACK

// START FILL WHITE
(FILLWHITE)
@state
D=M

// if already white -> do nothing
@KEY
D;JEQ

// change state to white
@state
M=0
@FILL
0;JMP
// END FILL WHITE

(KEY)
@KBD
D=M

@FILLWHITE
D;JEQ

@FILLBLACK
0;JMP

@KEY
0;JMP

(END)
@END
0;JMP
