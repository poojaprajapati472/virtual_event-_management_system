import { PassportStrategy } from '@nestjs/passport';
import { strategies } from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { Profile } from 'passport-google-oauth20';
export class Googlestrategy extends PassportStrategy(Strategy,'google'){
constructor(
   )
{
    super(
        {
            clientID:'317092611756-eqbi7lkne2d5jv1e9asv6iggkv7insdu.apps.googleusercontent.com',
            clientSecret:'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',
            callbackURL:'http://localhost:5000/user/google/redirect',
            scope:['email','profile'],
        }
    );
}
 async validate(accessToken :string,refreshToken: string,profile:Profile)
 {
    console.log(accessToken);
    console.log(refreshToken);
    // const { name, emails } = profile;
    // const userName = name.givenName + ' ' + name.familyName;
    // const fullName = name.givenName + ' ' + name.familyName;
    // const email = emails[0].value;
    // const validatedUser = await this.userservice.findOrCreateGoogleUser(userName, fullName, email);
    //  return validatedUser ;  

 }
}