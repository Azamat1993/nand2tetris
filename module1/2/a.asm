// --------- push constant 12
// *SP=i
@12
D=A
@SP
M=D
// SP++
@SP
M=M+1
// --------- pop local 1
// addr = LCL + i
@LCL
D=M
@1
D=D+A
@addr
M=D
// SP--
@SP
M=M-1
@SP
A=M
D=M
@addr
A=M
M=D
// --------- add  
