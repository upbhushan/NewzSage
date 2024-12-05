import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FaCheckCircle, FaInfoCircle, FaChartBar, FaCogs } from "react-icons/fa"; // Add icons

const Text = ({ children, className }) => (
  <p className={className}>{children}</p>
);

const AccuracyProbability = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-green-600">
          Model Performance - Accuracy & Probability
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Explore the performance of different classifiers, metrics, and features.
        </p>
      </header>

      {/* Naive Bayes Section */}
      <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">
          <FaCheckCircle className="inline-block text-green-500 mr-2" />
          Naive Bayes Classifier
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <CardTitle>Accuracy</CardTitle>
              <Text className="text-lg text-gray-700">
                The Naive Bayes model achieved an accuracy of approximately{" "}
                <strong>90%</strong>. This indicates that the model was able to
                correctly classify 90% of the articles as either real or fake.
              </Text>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <CardTitle>Precision, Recall, and F1-Score</CardTitle>
              <Text className="text-lg text-gray-700">
                <strong>Precision</strong> for real news was around{" "}
                <strong>0.91</strong>, and for fake news, it was{" "}
                <strong>0.88</strong>.
                <br />
                <strong>Recall</strong> for real news was <strong>0.88</strong>,
                and for fake news, it was <strong>0.91</strong>.
                <br />
                <strong>F1-Score</strong> was <strong>0.90</strong> for real
                news and <strong>0.89</strong> for fake news.
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Random Forest Section */}
      <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">
          <FaCheckCircle className="inline-block text-green-500 mr-2" />
          Random Forest Classifier
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <CardTitle>Accuracy</CardTitle>
              <Text className="text-lg text-gray-700">
                The Random Forest model achieved a higher accuracy of
                approximately <strong>94%</strong>, indicating better
                performance.
              </Text>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <CardTitle>Precision, Recall, and F1-Score</CardTitle>
              <Text className="text-lg text-gray-700">
                <strong>Precision</strong> for both real and fake news was{" "}
                <strong>0.94</strong>.
                <br />
                <strong>Recall</strong> for real news was <strong>0.94</strong>,
                and for fake news, it was <strong>0.93</strong>.
                <br />
                <strong>F1-Score</strong> was <strong>0.94</strong> for both
                real and fake news.
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Confusion Matrix Section
      <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">
          <FaChartBar className="inline-block text-blue-500 mr-2" />
          Confusion Matrix and Classification Report
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="image-container">
            <img
              src="/path/to/naive-bayes-confusion-matrix.png"
              alt="Naive Bayes Confusion Matrix"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="image-container mt-6 sm:mt-0">
            <img
              src="/path/to/random-forest-confusion-matrix.png"
              alt="Random Forest Confusion Matrix"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section> */}

      {/* Feature Importance Section */}
      <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">
          <FaCogs className="inline-block text-yellow-500 mr-2" />
          Feature Importance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <CardTitle>Key Features</CardTitle>
              <Text className="text-lg text-gray-700">
                The most important features in the Random Forest model were:
                <ul className="list-disc ml-6 text-gray-700">
                  <li>
                    <strong>Title and Body Text</strong>: Combined title and
                    body text was key for identifying real vs fake news.
                  </li>
                  <li>
                    <strong>Body Length</strong>: Shorter bodies were often
                    associated with fake news.
                  </li>
                </ul>
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Text Preprocessing Section */}
      <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">
          <FaCogs className="inline-block text-yellow-500 mr-2" />
          Text Preprocessing & Vectorization
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <CardTitle>Count Vectorization vs. TF-IDF</CardTitle>
              <Text className="text-lg text-gray-700">
                TF-IDF vectorization was more effective than CountVectorizer,
                as it highlighted important terms and reduced the weight of
                common terms.
              </Text>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <CardTitle>Stop Word Removal & Lemmatization</CardTitle>
              <Text className="text-lg text-gray-700">
                Removing stop words and applying lemmatization could further
                improve model performance.
              </Text>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Model Deployment Section */}
      <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">
          <FaInfoCircle className="inline-block text-purple-500 mr-2" />
          Model Deployment and User Interaction
        </h2>
        <Text className="text-lg text-gray-700">
          The system provides real-time predictions with confidence scores for
          users, allowing them to interact by liking, disliking, and providing
          feedback on articles. This helps improve model accuracy over time.
        </Text>
      </section>

      {/* Footer Section */}
      <footer className="footer text-center mt-12">
        <p className="text-lg text-gray-600">© 2024 - Model Performance Overview</p>
      </footer>
    </div>
  );
};

export default AccuracyProbability;
