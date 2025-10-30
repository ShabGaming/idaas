import { Building, MapPin, Star, Quote, ChevronDown, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const BusinessSummary = () => {
  const [isOpen, setIsOpen] = useState(false);

  type Review = {
    authorName: string;
    rating: number; // 0-5
    text: string;
    relativeTime?: string; // e.g., "2 weeks ago"
    source: "Google" | "Tripadvisor" | "Yelp";
    sourceUrl?: string; // link to the original review
  };

  const reviews: Review[] = [
    {
      authorName: "Alex P.",
      rating: 5,
      text:
        "Fantastic brunch spot. Staff were attentive and the seasonal menu was delicious.",
      relativeTime: "2 weeks ago",
      source: "Google",
      sourceUrl: "https://maps.google.com",
    },
    {
      authorName: "Rina K.",
      rating: 4,
      text:
        "Cozy interior with great music. Gets busy on weekends—expect a short wait.",
      relativeTime: "1 month ago",
      source: "Tripadvisor",
      sourceUrl: "https://www.tripadvisor.com",
    },
    {
      authorName: "Marcus D.",
      rating: 5,
      text:
        "Probably the best cappuccino in the neighborhood. Loved the seasonal pastries!",
      relativeTime: "3 weeks ago",
      source: "Yelp",
      sourceUrl: "https://www.yelp.com",
    },
    {
      authorName: "Sofia L.",
      rating: 4,
      text:
        "Great ambiance and friendly staff. Wish there were more vegan options on weekdays.",
      relativeTime: "5 days ago",
      source: "Google",
      sourceUrl: "https://maps.google.com",
    },
    {
      authorName: "James H.",
      rating: 5,
      text:
        "Date-night favorite. Seasonal menu keeps things interesting without being pretentious.",
      relativeTime: "3 months ago",
      source: "Tripadvisor",
      sourceUrl: "https://www.tripadvisor.com",
    },
  ];

  const sourceBadgeClass = (source: Review["source"]) => {
    switch (source) {
      case "Google":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Tripadvisor":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Yelp":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="shadow-lg animate-fade-in hover:shadow-xl transition-shadow border-l-4 border-l-primary">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="border-b bg-accent/30">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Business Overview
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Summary for business information powered by AI</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Removed Overview badge per request */}
            </CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-6 space-y-6">
            <section>
              <h4 className="font-semibold text-foreground mb-2">Description</h4>
              <p className="text-muted-foreground leading-relaxed">
                Evergreen Bistro is a modern neighborhood restaurant known for seasonal menus and
                locally sourced ingredients. The venue offers a relaxed dining experience with a
                focus on sustainability and community engagement.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location
              </h4>
              <div className="text-sm text-muted-foreground">
                <p className="text-base text-foreground">123 Queen St W, Toronto, ON M5H 2M9</p>
                <p>Located in Queen Plaza with strong walkability and transit access.</p>
              </div>
            </section>

            <section>
              <h4 className="font-semibold text-foreground mb-3">Street View</h4>
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {["/streetview1.jpg", "/streetview2.jpg", "/streetview3.jpg"].map((src, idx) => (
                      <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="overflow-hidden rounded-md border bg-card cursor-pointer">
                              <img
                                src={src}
                                alt={`Street view ${idx + 1}`}
                                className="h-40 w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl p-0 overflow-hidden">
                            <img src={src} alt={`Street view ${idx + 1} enlarged`} className="w-full h-auto object-contain" />
                          </DialogContent>
                        </Dialog>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-3 md:-left-4" />
                  <CarouselNext className="-right-3 md:-right-4" />
                </Carousel>
              </div>
            </section>

            <section className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <p className="text-sm font-medium">Reputation</p>
                <Badge variant="secondary" className="ml-auto">4.5 / 5</Badge>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Based on ~320 public reviews across major platforms</li>
                <li>• Common praise: food quality, ambiance, and friendly staff</li>
                <li>• Occasional issues: weekend wait times</li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-foreground mb-3">Recent Review Highlights</h4>
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {reviews.map((r, idx) => (
                      <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-3 rounded-lg border bg-card h-full flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-foreground">
                              <Quote className="h-4 w-4" />
                              <span className="text-sm font-medium truncate max-w-[180px]">{r.authorName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.round(r.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="mb-2">
                            <Badge variant="outline" className={`h-5 px-2 py-0 text-[10px] ${sourceBadgeClass(r.source)}`}>
                              {r.source}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-5">“{r.text}”</p>
                          <div className="mt-3 flex items-center text-xs text-muted-foreground">
                            <span>{r.relativeTime || ""}</span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4 md:-left-6" />
                  <CarouselNext className="-right-4 md:-right-6" />
                </Carousel>
              </div>
            </section>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default BusinessSummary;


