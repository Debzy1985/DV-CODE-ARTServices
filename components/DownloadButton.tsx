import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DownloadButtonProps {
  data: any[];
  filename: string;
  label: string;
  headers?: string[];
}

export const DownloadButton = ({ data, filename, label, headers }: DownloadButtonProps) => {
  const { toast } = useToast();

  const downloadCSV = () => {
    try {
      if (!data || data.length === 0) {
        toast({ title: "No data available", description: "There's no data to download.", variant: "destructive" });
        return;
      }

      const csvHeaders = headers || Object.keys(data[0]);
      const csvContent = [
        csvHeaders.join(','),
        ...data.map(row => 
          csvHeaders.map(header => {
            const value = row[header] || '';
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
          }).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({ title: "Download successful", description: `${label} exported as CSV` });
    } catch (error) {
      toast({ title: "Download failed", description: "Error generating CSV file", variant: "destructive" });
    }
  };

  return (
    <Button onClick={downloadCSV} variant="outline" size="sm" className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
};