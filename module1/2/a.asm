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
// pop arg2
// SP--
@SP
M=M-1
@SP
A=M
D=M
@arg2
M=D
// pop arg1
// SP--
@SP
M=M-1
@SP
A=M
D=M
@arg2
D=D+M
@SP
A=M
M=D
// SP++
@SP
M=M+1
