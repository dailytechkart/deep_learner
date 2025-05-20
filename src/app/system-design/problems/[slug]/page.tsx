import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { MainLayout } from '@/components/MainLayout'
import styled from 'styled-components'

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100vh;
`

const MDXContent = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.text};
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 0 1rem;
    color: ${props => props.theme.colors.text};
  }

  h3 {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem;
    color: ${props => props.theme.colors.text};
  }

  p {
    margin: 1rem 0;
    line-height: 1.6;
  }

  pre {
    background: ${props => props.theme.colors.backgroundAlt};
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  code {
    font-family: 'Fira Code', monospace;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  li {
    margin: 0.5rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  th, td {
    border: 1px solid ${props => props.theme.colors.border};
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`

async function getMDXContent(slug: string) {
  const filePath = path.join(process.cwd(), 'src/app/system-design/problems', `${slug}.mdx`)
  
  try {
    const source = fs.readFileSync(filePath, 'utf8')
    return source
  } catch (error) {
    return null
  }
}

export default async function ProblemPage({ params }: { params: { slug: string } }) {
  const content = await getMDXContent(params.slug)
  
  if (!content) {
    notFound()
  }

  return (
    <MainLayout>
      <ContentContainer>
        <MDXContent>
          <MDXRemote source={content} />
        </MDXContent>
      </ContentContainer>
    </MainLayout>
  )
}
