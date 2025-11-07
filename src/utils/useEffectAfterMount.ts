// https://www.youtube.com/@cosdensolutions
// I remember I used to watch short video, he and the person below the comment do this one
// Source: CodenSolutions and the guys
import { useEffect, useState } from "react"

export default function useEffectAfterMount(callback: () => void, dependencies: React.DependencyList) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  useEffect(() => {
    if (!isMounted) return
    callback()
  }, [isMounted, ...dependencies])
}