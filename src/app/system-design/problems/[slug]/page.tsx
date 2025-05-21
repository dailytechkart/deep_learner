import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { MainLayout } from '@/components/MainLayout'
import { ProblemContent } from './ProblemContent'

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
      <ProblemContent content={content} />
    </MainLayout>
  )
}
