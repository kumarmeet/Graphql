// mutation{
//     createUser(input:{
//       name: "test"
//       auth: AUTHERIZED,
//       emails: [
//         {email: "test0@test.com"},
//         {email: "test1@test.com"},
//         {email: "test2@test.com"}
//       ]
//     })
//     {
//       id
//       name
//       auth
//     }
//   }
  
//   query{
//     getUser(id:{"a2fdab6d-8230-44d0-8196-25a5ef32bda8"})
//     {
//       emails
//     }
//   }