import RecoilWrapper from '../components/RecoilWrapper'
import NewsFeedContent from '../components/NewsFeedContent'

export default function Home() {
  return (
    <RecoilWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">News Feed</h1>
        <NewsFeedContent />
      </div>
    </RecoilWrapper>
  )
}