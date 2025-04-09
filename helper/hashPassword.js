import bcrypt from "bcrypt"
 const incryptedPassword = async(password)=>{
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)
  return hash
}

 const matchPassword = async(password,user)=>{
  const match =await bcrypt.compare(password,user)
  return match
}

export {incryptedPassword,matchPassword}