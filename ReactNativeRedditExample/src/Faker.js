
import faker from 'faker';
import _ from 'lodash';



let FakePersonArray = new _.times(15,(i)=>{
  return {
    index:i,
    key:i,
    name:faker.name.findName(),
    avatar:faker.internet.avatar(),
    group:_.sample(["Work","Friend","Acquaintance","Other"]),
    email:faker.internet.email(),
  }
})


export  {FakePersonArray}
