import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'

const Result = () => {
    const location = useLocation()
    const { lastBackendResponse } = useGlobalContext()

    const response = useMemo(() => {
        return location.state?.response || lastBackendResponse || null
    }, [lastBackendResponse, location.state])

    const prediction = response?.prediction || null
    const status = response?.status || 'unknown'

    // Backend response
    // "prediction": {
    //     "likely_to_buy_cricket_kit": 1,
    //     "cluster_segment": 2
    //   }

    //     cluster_names = {
    //     0: "High Income Casual Viewers",
    //     1: "Budget IPL Enthusiasts",
    //     2: "Premium Hardcore IPL Fans",
    //     3: "Low Engagement Users"
    // }

    const clusFunction = (value)=> {
        if(value === 0){
            return "High Income Casual Viewers"
        }
        if (value === 1) {
            return "Budget IPL Enthusiasts"
        }
        if (value === 2 ){
            return "Premium Hardcore IPL Fans"
        }
        return "Low Engagement Users"
    }

    return (
        <main className="result-shell">
            <section className="result-card">
                <p className="result-kicker">Response from backend</p>
                <h1>Prediction Result</h1>

                {status === 'success' && prediction ? (
                    <div className="result-panel">
                        <div className="result-item">
                            <span>Likely to Buy Cricket Kit</span>
                            <strong>{prediction.likely_to_buy_cricket_kit === 1 ? "Yes" : "No"}</strong>
                        </div>
                        <div className="result-item">
                            <span>Customer Segment</span>
                            <strong>{clusFunction(prediction.cluster_segment)}</strong>
                        </div>
                    </div>
                ) : (
                    <div className="result-panel result-panel-empty">
                        <p>No prediction data was found for this session.</p>
                    </div>
                )}

                <div className="result-actions">
                    <Link className="result-button result-button-secondary" to="/">
                        Back to form
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Result