const getRandomInt = (min, max) => {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
export default getRandomInt

