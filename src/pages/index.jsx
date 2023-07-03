import { fetchData } from '@/services/todo'
import Head from 'next/head'
import { domain } from '@/utils/config'
import TodosPage from './todos'

export default function PagesIndex(props) {
  return (
    <div className="text-center">
      <Head>
        <title>Todo list</title>
        <meta name="description" content="Add items to your site in minutes. Also you can update and delete the item from list todos. Join them!" />
        <meta property="og:title" content="Add item to your site" />
        <meta property="og:description" content="The todo item include title, id, createdAt, updatedAt" />
        <meta property="og:url" content={domain} />
        <meta property="og:type" content="website" />
      </Head>
      <TodosPage {...props} />
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetchData()

  return {
    props: { initData: data }
  }
}
