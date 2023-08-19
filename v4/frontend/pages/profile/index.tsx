import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';
import AppProfileUtilisateur from "../../layout/AppProfileUtilisateur";

const Profile: NextPageWithLayout = () => {
    return <AppProfileUtilisateur />
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
