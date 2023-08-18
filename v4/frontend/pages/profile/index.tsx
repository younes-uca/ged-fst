import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';
import AppProfile from "../../layout/AppProfile";

const Profile: NextPageWithLayout = () => {
    return <AppProfile />
}

Profile.getLayout = function getLayout(page: ReactNode) {
    return (
        <AuthGuard>
            <Layout>
                {page}
            </Layout>
        </AuthGuard>
    )
}

export default Profile;
