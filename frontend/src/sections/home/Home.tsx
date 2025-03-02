import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getTokenData, removeLocalStorageItem } from "@/utils";
import LogoSVG from "@/assets/logo.svg?react";
import {
  useCheckQuizAnswerMutation,
  useGetUserDetailsQuery,
  useInviteFriendMutation,
  useLazyGetDatasetQuery,
} from "@/api/api";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  ChevronRight,
  MapPin,
  HelpCircle,
  Trophy,
  Share2,
  Copy,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { useLocation, useSearchParams } from "react-router-dom";
const count = 200;
const defaults = {
  origin: { y: 0.7 },
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
}
const Home = () => {
  const token = getTokenData() as { _id: string };
  const { data } = useGetUserDetailsQuery({});
  const [searchParams] = useSearchParams();
  const challengedata = {
    userName: searchParams.get("invitedBy"),
    correct: searchParams.get("correct"),
    incorrect: searchParams.get("incorrect"),
  };
  const user = data?.data;
  const [quizData, setQuizData] = useState<any>(null);
  const [quizNumber, setQuizNumber] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isOpenunFactDialog, setIsOpenFunFactDialog] = useState<boolean>(false);
  const [answerData, setAnswerData] = useState<any>(null);
  const [quizScore, setQuizScore] = useState<{
    correct: number;
    incorrect: number;
  }>({ correct: 0, incorrect: 0 });
  const [shareUrl, setShareUrl] = useState<string>("");
  const location = useLocation();
  const [getDataset] = useLazyGetDatasetQuery();

  const [inviteFriend] = useInviteFriendMutation();
  const [checkQuizAnswer] = useCheckQuizAnswerMutation();
  const quizCardRef = useRef(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onGenerateQuiz = async () => {
    setLoading(true);
    const quizDataResponse = await getDataset(token._id).unwrap();
    setQuizData(quizDataResponse.data);
    setLoading(false);
  };
  useEffect(() => {
    onGenerateQuiz();
  }, []);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return; // Prevent selection after submission
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    try {
      const response = await checkQuizAnswer({
        datasetId: quizData.datasetId,
        option: selectedOption,
      }).unwrap();
      if (response.isCorrect) {
        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
        setQuizScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setQuizScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }
      setAnswerData(response);
      setTimeout(() => {
        setIsOpenFunFactDialog(true);
      }, 100);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNext = async () => {
    try {
      await onGenerateQuiz();
      setQuizNumber((prev) => prev + 1);
      setIsSubmitted(false);
      setSelectedOption("");
      setAnswerData(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePlayAgain = async () => {
    try {
      setQuizNumber(1);
      setIsSubmitted(false);
      setSelectedOption("");
      setQuizData(null);
      setQuizScore({ correct: 0, incorrect: 0 });
      setAnswerData(null);
      await onGenerateQuiz();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShareChallenge = async () => {
    try {
      const pageurl = `${window.location.origin}${location.pathname}`;
      const data = await inviteFriend({
        userName: user?.userName,
        score: { correct: quizScore.correct, incorrect: quizScore.incorrect },
        pageUrl: pageurl,
      }).unwrap();
      setShareUrl(data.data.inviteLink);
      // Create a snapshot of the quiz card
      if (!quizCardRef.current) return;

      const canvas = await html2canvas(quizCardRef.current, {
        backgroundColor: "#252525",
        scale: 2, // Higher quality
      });

      // Convert canvas to blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (!blob) return;

      // Create a file from the blob
      const imageFile = new File([blob], "globe-trattor-challenge.png", {
        type: "image/png",
      });
      const newImageUrl = URL.createObjectURL(imageFile); // Generate URL for the image
      setImageUrl(newImageUrl); // Store the image URL in state
      // Create share data
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <div className="min-h-screen bg-bg-dark text-text-light flex flex-col">
      {/* Header */}
      <header className="p-4 pr-8 pl-8 flex justify-between items-center border-b border-border-dark">
        <div className="flex items-center gap-2">
          <LogoSVG className="rounded-full h-12 w-12" />
          <div className="flex flex-col">
            <span className="font-bold text-xl">Globe Trattor</span>
            <span className="text-xs text-text-light/80 -mt-1">Quiz Game</span>
          </div>
        </div>
        {imageUrl && (
          <Dialog
            open={!!shareUrl}
            onOpenChange={(open) => {
              if (!open) {
                setShareUrl("");
                setImageUrl(null);
              }
            }}
          >
            <DialogContent className="bg-bg-gray border-border-dark text-text-light">
              <DialogHeader className="flex items-start justify-between">
                <DialogTitle className="text-xl font-bold">
                  Challenge a friend
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 rounded-full h-8 w-8 p-0 text-text-light hover:bg-border-dark"
                  onClick={() => {
                    setShareUrl("");
                    setImageUrl(null);
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="mb-2 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Quiz Challenge"
                      className=" h-[15rem] rounded-md border border-border-dark"
                    />
                  </div>
                  <p className="text-sm font-medium">Share URL</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-bg-light-gray p-2 rounded-md flex-1 text-sm overflow-hidden text-ellipsis">
                      {shareUrl}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 bg-border-dark border-border-dark hover:bg-border-dark"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy URL</span>
                    </Button>
                  </div>
                  {isCopied && <div className="text-green-500">Copied!</div>}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-text-light hover:text-text-light/80">
                <span className="sr-only">Profile</span>
                <span className="text-xl">👤</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="font-bold">
                {user?.fullName}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-500">
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-200"
                onClick={() => {
                  removeLocalStorageItem("token");
                  removeLocalStorageItem("refreshToken");
                  window.location.reload();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex items-center justify-between px-6 py-3 bg-bg-gray border border-border-dark rounded-lg mb-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-bg-green/20 px-3 py-1.5 rounded-md border border-bg-green/30">
            <Trophy className="h-4 w-4 text-text-success" />
            <span className="font-medium">Correct: {quizScore.correct}</span>
          </div>
          <div className="flex items-center gap-2 bg-bg-red/20 px-3 py-1.5 rounded-md border border-bg-red/30">
            <span className="text-xl">😢</span>
            <span className="font-medium">
              Incorrect: {quizScore.incorrect}
            </span>
          </div>
        </div>
        {challengedata.userName && (
          <Card className="bg-bg-light-gray border border-border-dark shadow-lg p-4 ">
            <div className="flex flex-col items-center text-text-light">
              <h2 className="text-lg font-bold ">Challenge Invitation</h2>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-text-light/80">
                  userName: {challengedata.userName}
                </p>
                <p className="text-sm text-text-light/80">
                  correct: {challengedata.correct}
                </p>
                <p className="text-sm text-text-light/80">
                  incorrect: {challengedata.incorrect}
                </p>
              </div>
            </div>
          </Card>
        )}
        <Button
          onClick={handleShareChallenge}
          className="bg-border-dark text-text-light border-border-dark border hover:bg-border-dark"
        >
          <Share2 className="h-4 w-4" />
          Challenge a friend
        </Button>
      </div>
      <main className="flex-1 flex flex-col items-center p-6 max-w-3xl mx-auto w-full">
        <Card
          className="w-full bg-bg-gray border-border-dark shadow-lg"
          ref={quizCardRef}
        >
          <CardHeader className="border-b border-border-dark bg-bg-light-gray rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-text-light">
                <MapPin className="h-5 w-5 text-text-light/80" />
                Quiz {quizNumber}
              </CardTitle>
              <div className="bg-border-dark px-3 py-1 rounded-full text-sm text-text-light">
                {loading ? "Loading..." : "Guess the famous destination"}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-light"></div>
                <p className="mt-4 text-text-light/80">Loading quiz...</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  {answerData && !answerData?.isCorrect && (
                    <div className="flex justify-center items-center mb-2 p-3 bg-bg-red rounded-lg border border-border-error">
                      <span className="text-3xl mr-2">😢</span>
                      <p className="text-text-light font-medium">
                        Incorrect answer! Try the next question.
                      </p>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-text-light">
                    <HelpCircle className="h-5 w-5 text-text-light/80" />
                    Clues
                  </h3>
                  <div className="bg-bg-light-gray rounded-lg p-4 border border-border-dark">
                    {quizData?.clues?.map((clue: any, index: number) => (
                      <div
                        key={index}
                        className="mb-2 last:mb-0 flex items-center space-x-2"
                      >
                        <span className="bg-border-dark text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <p className="text-text-light font-medium p-0">
                          {clue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-text-light">
                    Options
                  </h3>
                  <div className="grid gap-3">
                    {quizData?.options?.map((option: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        disabled={isSubmitted}
                        className={`w-full p-4 rounded-lg text-left transition-all flex items-center justify-between
                          ${
                            selectedOption === option
                              ? "bg-bg-green border-[#6a8761] border"
                              : "bg-bg-gray hover:bg-[#454545] border border-border-dark"
                          }
                          ${
                            isSubmitted
                              ? "cursor-not-allowed opacity-80"
                              : "cursor-pointer"
                          }
                        `}
                      >
                        <span className="text-text-light">{option}</span>
                        {selectedOption === option && (
                          <Check className="h-5 w-5 text-text-success" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {!isSubmitted ? (
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedOption || isSubmitted}
                      className={`bg-bg-green text-text-light border-[#6a8761] border hover:bg-[#5a7a51] hover:border-[#7a9a71] transition-all duration-200 px-5 py-2 rounded-md font-medium flex items-center gap-2 shadow-lg ${
                        !selectedOption || isSubmitted
                          ? "opacity-50 cursor-not-allowed hover:bg-bg-green hover:border-[#6a8761]"
                          : ""
                      }`}
                    >
                      {"Submit Answer"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-3">
                    <Button
                      className="bg-border-dark text-text-light border-border-dark border hover:bg-border-dark"
                      onClick={handlePlayAgain}
                    >
                      Play Again
                    </Button>
                    <Button
                      className="bg-bg-green text-text-light border-[#6a8761] border hover:bg-[#5a7a51] hover:border-[#7a9a71] transition-all duration-200 px-5 py-2 rounded-md font-medium flex items-center gap-2 shadow-lg"
                      onClick={handleNext}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Quiz Challenge"
                    className="w-full h-auto mb-4"
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>

      {isOpenunFactDialog && (
        <Dialog open={isOpenunFactDialog}>
          <DialogContent className="bg-bg-light-gray border-border-dark text-text-light">
            <DialogHeader className="flex items-start justify-between">
              <DialogTitle className="text-xl font-bold capitalize">
                correct answer: {answerData?.answer}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-full h-8 w-8 p-0 text-text-light hover:bg-border-dark"
                onClick={() => {
                  setIsOpenFunFactDialog(false);
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogHeader>
            <div className="text-lg font-semibold  text-text-light capitalize">
              fun facts
            </div>
            <div className="space-y-4">
              {answerData?.funFacts?.map((fact: any, index: number) => (
                <p key={index} className="text-text-light font-medium">
                  {fact}
                </p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="p-4 text-center text-text-light/70 text-sm border-t border-border-dark">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span>© 2024 Globe Trattor</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
