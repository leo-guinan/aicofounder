import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const fullName = z
  .string()
  .min(3)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
  fullName,
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})

export const AddPodcastRecommendation = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string(),
  recommendation: z.string(),
})

export const AddFact = z.object({
  question: z.string(),
  answer: z.string(),
})

export const Search = z.object({
  query: z.string(),
  slug: z.string(),
})

export const AddRecommendation = z.object({
  title: z.string(),
  url: z.string(),
  recommendation: z.string(),
})

export const AddSearchEngine = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
})

export const AddLink = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  url: z.string(),
  image: z.string().optional(),
})

export const CreateCheckoutSession = z.object({
  priceId: z.number(),
})

export const SendMessage = z.object({
  message: z.string(),
})

export const ChatSession = z.object({
  sessionId: z.string(),
})

export const StartSession = z.object({
  sessionType: z.enum(["daily_great", "daily_bad", "daily_ok"]),
})

export const SetPreferences = z.object({
  preferences: z.object({
    daily_checkin: z.boolean(),
  }),
})

export const SetBusinessProfile = z.object({
  founderName: z.string(),
  founderProfile: z.string(),
  businessName: z.string(),
  businessProfile: z.string(),
  businessWebsite: z.string(),
})
