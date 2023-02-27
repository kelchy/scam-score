// currently unused

const PerplexityAI = require('perplexityai');

const main = async() => {
  const prompt = 'multiple choice. left, right, neutral. is this article biased? https://www.foxnews.com/world/u-s-forces-chinas-hand-revealing-possible-lethal-aid-russia-war-ukraine-experts';
  //const prompt = 'multiple choice. left, right, neutral. is this article biased? https://www.foxnews.com/world/u-s-forces-chinas-hand-revealing-possible-lethal-aid-russia-war-ukraine-experts';
  //const prompt = 'multiple choice. left, right, neutral. is this article biased? https://www.foxnews.com/politics/white-house-pushes-higher-rail-company-fines-ohio-visit';
  const response = await PerplexityAI.search(prompt);
  console.log('response', response);
}

main();
