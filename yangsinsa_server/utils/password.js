import bcrypt from 'bcryptjs';

const hashedPassword =  async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('hash', hash);

    return hash;

}

const comparePassword = async (password1, password2) => {
    const result = await bcrypt.compare(
        password1,
        password2,
    );
    return result;
}

export {hashedPassword, comparePassword}