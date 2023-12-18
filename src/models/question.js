async function getOneQuestion(category) {
    try {
        const response = await fetch(`http://localhost:3000/questions/?category=${category}`);
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        const question = await response.json();
        return question;
      } catch (err) {
        console.error('getOneQuestion::error: ', err);
        throw err;
      }
}


export default  getOneQuestion;