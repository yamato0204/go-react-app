
import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next'
import { client } from '@/libs/axios'
import { get } from 'http';
import { Router, useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';


//const inter = Inter({ subsets: ['latin'] })


const Index: React.FC = () => {
const router = useRouter()
 
  
  useEffect(() => {

     client.get('/cookie', {
                withCredentials: true
            }).then(
              (response) => {
                console.log(response.data)
                if (response.data == "NoCookie") {
                  console.log("loginへ")
                  router.push("/login")
                } else {
                  console.log("ok")
                  router.push("/home")
                }
              }
            )

  })
  
 
  

  return  <div></div>;
};
export default Index;


// export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
//   try {
//     // サーバーサイドの処理を行うコードを記述する
//    await client.get('/cookie', {
//                 withCredentials: true
//             }).then(
//                 (response) => {
//                     console.log(response.data)
//                     console.log(response.status); // 200
//                     console.log(response.headers); // 'OK'

//                 })
//     // サーバーサイドプロップスを返す
//     return {
//       props: {
//         // サーバーサイドプロップスのデータを返す場合はここに記述する
//       },
//     };
//   } catch (error) {
//     // エラーハンドリングを行う場合はここに記述する
//     console.error(error);

//     // エラーの場合はリダイレクトやエラーページを表示する場合も考慮して返り値を設定する
//     return {
//       redirect: {
//         destination: '/', // リダイレクト先のパスを指定する
//         permanent: false, // リダイレクトを一時的なものにするか永続的なものにするか指定する
//       },
//     };

//     // または、エラーページのコンポーネントを表示する場合
//     // return {
//     //   notFound: true,
//     // };
//   }
// };
  
 
  
