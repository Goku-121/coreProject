import React from "react";
import Layout from "../components/layout/Layout";
import ProfileForm from "../components/user/ProfileForm.jsx";
import ProfileSkeleton from "../skeleton/ProfileSkeleton.jsx";

const ProfilePage = () => {

    return (
        <Layout>
           <ProfileForm/>
        </Layout>
    );
};
export default ProfilePage;