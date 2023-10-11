import Layout from "@/components/Layout/Layout";
import UserPageLayout from "@/components/Layout/UserPageLayout";
import { useRouter } from "next/router";


const UserPage = () => {
    const router = useRouter();
    const { user_id } = router.query;

     if (!user_id) {
        // ユーザーIDがまだ利用可能でない場合の処理（例: ローディングスピナーを表示する）
        return <div>Loading...</div>;
    }


    return (
         <Layout>
            <UserPageLayout userId={user_id} />
       </Layout>
    );
}

export default UserPage;