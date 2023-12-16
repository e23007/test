import { Heading } from '@chakra-ui/react'
export const TodoTitle = ({ title, as, mt, fontSize }) => {
  return (
    <Heading as={as} mt={mt} fontSize={fontSize}>
      {title}
    </Heading>
    // if (as === 'h1') return <h1>{title}</h1>
    // if (as === 'h2') return <h2>{title}</h2>
  )
}
