import { userService } from './services/user.service'

async function testService() {
    try {
        const creators = await userService.getAllCreators()
        console.log('Service returned creators:', creators.length)
        const profiles = creators.map((u: any) => u.profile).filter(Boolean)
        console.log('Profiles found:', profiles.length)
        if (profiles.length > 0) {
            console.log('Sample profiles:', profiles.map((p: any) => p.fullName))
        }
    } catch (error) {
        console.error('Service call failed:', error)
    }
}

testService()
