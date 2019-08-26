import { createParamDecorator } from '@nestjs/common'

export const CustomRes = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return ctx.res
  },
)
