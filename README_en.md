Link para a versão português-br: [README-pt-br](https://github.com/moraesandre88/rem-server#readme)

# REM-Server

Hello! Welcome. This is a server for a real estate management system using Node.js, Express.js, and MongoDB. It is part of the REM project along with [REM-System](https://github.com/moraesandre88/rem-system) and REM-Site, all in development.

## Initial Setup

Once you have REM-Server on your machine, some configurations need to be done for the server and some of its services to operate correctly. The steps are detailed in the listing below.

### 1. Npm

First and foremost, remember to install the necessary dependencies for the project to work. In your terminal, navigate to the `rem-server` project folder and execute the command: `npm i`. Once everything is installed, you can proceed to the next steps.

### 2. MongoDB

As mentioned earlier, the server uses [MongoDB](https://www.mongodb.com/) to store its database. If you already have an account and an active cluster, you can use them. Otherwise, use the link above to access the service and create them. Once created, you will need to establish a connection to the project. To do this, go to your account, your cluster, and click on `Connect`. Select the `Drivers` option under `Connect to your application`. Copy the link that appears under the option `Add your connection string into your application code`. Back in REM-Server, create a file named `.env` in the root of the project and create a variable called `DATABASE_URI`. This variable will store the link copied from MongoDB. Modify the information in the link to include your password.

### 3. Cloudinary

For photo hosting, [Cloudinary](https://cloudinary.com/) was used. Like MongoDB, you will need to create an account for its use if you don't already have one. Access the link above, and you will be directed to the service's homepage where you can register. After that, access your account and check the necessary variables to configure the service in your project. There are three: `cloud_name`, `api_key`, and `api_secret`. The first two are public, but the third is protected. To access it, go to the side menu and click on `Settings`. Then, in the side menu, look for `Access Keys`. A page will open with your `API Key` and `API Secret`, with the latter still protected. To view it, hover over it, and the option to view will appear on the right. Click on it. A password will be sent to the registered email to confirm that you want to verify the variable. Enter this password in the indicated field, and you can view and copy it. Back in REM-Server, go to the `.env` file and create three variables: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Save the configuration variables in their respective environment variables to finish. There is one more `optional configuration` that can be done. It is possible to set a `default` folder to store your photos on Cloudinary. To do this, go to `Settings` again in your account and then `Upload`. Look for `Upload presets` on the page that opens. There, you can create your default folder, name it, and, in REM-Server, use it when uploading images. To do this, open the `imagesStoring.js` file in `config` and set it in `upload_preset`. Note that this was the approach taken in creating the file, and the folder is called `assets`. As mentioned, this action is `optional`. If you don't want to do it, just don't create the folder on Cloudinary and delete the object that contains the folder name in `imagesStoring.js`.

## Starting the Server

After configuration, open your terminal, go to `rem-server`, and run the command `npm run dev`. There you go, your server is now running and ready to be used.

## Notes

When using the [REM System](https://github.com/moraesandre88/rem-system) to access the system and make requests to the server, you will need to create a username and password. When creating the first user, the `access and refresh tokens` will also be created. Both will be stored in the `.env` file, and you will need to restart your server at that time. This action should only be done at that time.

You can also choose not to use the system and test the server using [Thunder Client](https://www.thunderclient.com/) or [Postman](https://www.postman.com/). In both cases, you will need to change the security settings for the use of cookies in two files: `authController.js` and `refreshTokenController.js`. In the line of code where the cookie is being created, change the `secure` option from `true` to `false`. This is necessary for sending cookies when using either of the two services and a local server.
