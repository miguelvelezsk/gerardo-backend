import bcrypt from 'bcrypt'

export const encryptPassword = async (password: string) => {
    return bcrypt.hash(password, 10)
}

export const calculateAge = async (birthDay: Date) => {

  const today = new Date();
  let age = today.getFullYear() - birthDay.getFullYear();
  const monthDiff = today.getMonth() - birthDay.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())) {
    age--;
  }

  return age;
}