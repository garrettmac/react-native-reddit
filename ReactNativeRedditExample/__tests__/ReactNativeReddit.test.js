// import 'react-native';

import ReactNativeReddit from '../ReactNativeReddit';
let emptyArray=[]
describe("ReactNativeReddit", function () {





test("User Params should not empty",()=>{
  // expect(ReactNativeReddit.credentials).toEqual(expect.objectContaining({
  expect(ReactNativeReddit.placesArticlePosted).toEqual(expect.arrayContaining(emptyArray));
  expect(ReactNativeReddit.activeArticleData).toBeFalsy()
  expect(ReactNativeReddit.me).toBeFalsy()
  expect(ReactNativeReddit.login).toBeFalsy()
  expect(ReactNativeReddit.articleImage).toBeFalsy()
  expect(ReactNativeReddit.all_credentials).toEqual(expect.arrayContaining(emptyArray));
    expect(ReactNativeReddit.modhash).toBeFalsy()
    expect(ReactNativeReddit.cookie).toBeFalsy()
    expect(ReactNativeReddit.lastLogin).toBeFalsy()
  // }))
})

  test('FetchURLOnReddit', async (response) => {
  await expect(ReactNativeReddit.FetchURLOnReddit('https://www.google.com')).resolves.toBeTruthy()

  // await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus');
});
  // it("init", function () {
  //
  //   ReactNativeReddit.init('posts', '3').then(response => {
  //     console.log("response",response); //< this is never printed
  //     expect(response.id).toBe(1); //< always pass / gets ignored?
  //   });
  //
  // });
});
