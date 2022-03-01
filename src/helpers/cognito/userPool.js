import { CognitoUserPool } from 'amazon-cognito-identity-js'

const pool = {
    UserPoolId: 'eu-central-1_0657elRnn',
    ClientId: '2sea9hfu7t8c3d4v1buinl800a'
}


export default new CognitoUserPool(pool)
