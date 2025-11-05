
// ---------------- OTP Generate ----------------
const generateCode = () => {
  const chars = "01234567891011121314151617181920919293949596979810020120220320420523020312450"; 
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

export default generateCode;
