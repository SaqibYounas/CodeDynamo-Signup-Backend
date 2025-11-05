import { promises as dns } from 'dns';  

// ---------------- Domain Check IF valid the User enter the email@gmail.com-<its domain  ----------------
const checkEmailDomain = async (email) => {
    const domain = email.split("@")[1];
      console.log("check email");
    try {
        const records = await dns.resolveMx(domain);      console.log("ok email");

        return records.length > 0; 
    } catch (error) {
        console.log("no sai email");
        return false;
    }
};

export default checkEmailDomain;